import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SensorEvent } from 'src/app/models/SensorEvent';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EventsComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { type: 'list' | 'add'; payload?: SensorEvent[] }
  ) {}

  ngOnInit(): void {}

  onSubmit(values) {
    this.dialogRef.close(values);
  }
}
