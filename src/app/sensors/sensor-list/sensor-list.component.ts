import { SensorFormValues } from './../form/form.component';
import { DialogComponent } from './../dialog/dialog.component';
import { Sensor } from './../../models/Sensor';
import { SensorService } from './../../services/sensor.service';
import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogConfig,
} from '@angular/material/dialog';
import { EventsComponent } from '../events/events.component';
import { SensorEventsService } from '../../services/sensor-events.service';
import { SensorEvent } from 'src/app/models/SensorEvent';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sensor-list',
  templateUrl: './sensor-list.component.html',
  styleUrls: ['./sensor-list.component.scss'],
})
export class SensorListComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'latlng',
    'active',
    'maxval',
    'minval',
    'action',
    'addEvent',
    'ListEvents',
  ];
  dataSource: Sensor[] = [];
  sensorsEvents: SensorEvent[];

  constructor(
    private sensorService: SensorService,
    public dialog: MatDialog,
    private sensorEventService: SensorEventsService
  ) {}

  ngOnInit(): void {
    this.fetchSensors();
  }

  fetchSensors(): void {
    this.sensorService.getAll().subscribe({
      next: (sensors) => (this.dataSource = sensors),
    });
  }

  fetchSensorsEvents(id: string): Observable<SensorEvent[]> {
    return this.sensorEventService.getBySensorId(id);
  }

  onRowClick(sensor: Sensor): void {
    this.openDialog(sensor);
  }

  openDialog(sensor?: Sensor): void {
    let defaultOpts: MatDialogConfig = {
      height: '95vh',
      width: '40vw',
    };

    if (sensor) {
      defaultOpts = {
        ...defaultOpts,
        data: sensor,
      };
    }

    const dialogRef = this.dialog.open(DialogComponent, defaultOpts);

    dialogRef.afterClosed().subscribe({
      next: (values) => {
        if (values) {
          this.createSensor(values);
        }
      },
    });
  }

  onAction(
    event: InputEvent,
    name: 'delte' | 'add' | 'list',
    sensor: Sensor & { _id: string }
  ): void {
    event.stopPropagation();
    if (name === 'delte') {
      this.onDelete(sensor);
    }

    if (name === 'add') {
      this.addSensorEvent(sensor);
    }

    if (name === 'list') {
      this.listSensorEvents(sensor);
    }
  }

  addSensorEvent(sensor: Sensor & { _id: string }): void {
    const dialogRef = this.dialog.open(EventsComponent, {
      height: '35vh',
      width: '40vw',
      data: { type: 'add' },
    });

    
    dialogRef.afterClosed().subscribe(({ value }: {value: number}) => {
      this.sensorEventService
        .addSensorEvent({
          id: sensor._id,
          value,
        })
        .subscribe({
          next: () => undefined,
        });
    });
  }

  listSensorEvents(sensor): void {
    this.fetchSensorsEvents(sensor._id).subscribe({
      next: (events) => {
        const dialogRef = this.dialog.open(EventsComponent, {
          height: '95vh',
          width: '40vw',
          data: { type: 'list', payload: events },
        });
      },
    });
  }

  onDelete(sensor: Sensor & { _id: string }): void {
    this.sensorService.removeSensor(sensor._id).subscribe((res) => {
      this.dataSource = this.dataSource.filter(
        (elements: Sensor & { _id: string }) =>
          elements._id === res._id ? null : elements
      );
    });
  }

  createSensor(sensorData: SensorFormValues): void {
    const normalizedSensor: Sensor = {
      active: sensorData.active,
      location: {
        type: 'Point',
        coordinates: [sensorData.latitude, sensorData.longitude],
      },
      maxval: sensorData.maxval,
      minval: sensorData.minval,
      name: sensorData.name,
    };
    this.sensorService.createSensor(normalizedSensor).subscribe((sensor) => {
      this.dataSource = [...this.dataSource, sensor];
    });
  }
}
