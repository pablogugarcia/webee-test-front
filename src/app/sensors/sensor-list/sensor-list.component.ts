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
  ];
  dataSource: Sensor[] = [];

  constructor(private sensorService: SensorService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchSensors();
  }

  fetchSensors(): void {
    this.sensorService.getAll().subscribe({
      next: (sensors) => (this.dataSource = sensors),
    });
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

  onDelete(event: InputEvent, sensor: Sensor & { _id: string }): void {
    event.stopPropagation();
    this.sensorService
      .removeSensor(sensor._id)
      .subscribe(() => alert('Eliminado con exito'));
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
