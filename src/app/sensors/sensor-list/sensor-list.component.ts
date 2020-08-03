import { DialogComponent } from './../dialog/dialog.component';
import { Sensor } from './../../models/Sensor';
import { SensorService } from './../../services/sensor.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    this.dialog.open(DialogComponent, {
      data: sensor,
      height: '95vh',
      width: '40vw'
    });
  }

  onDelete(event: InputEvent, sensor: Sensor & { _id: string }): void {
    event.stopPropagation();
    this.sensorService
      .removeSensor(sensor._id)
      .subscribe(() => alert('Eliminado con exito'));
  }
}
