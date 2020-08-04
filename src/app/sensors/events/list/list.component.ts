import { Component, OnInit, Input } from '@angular/core';
import { SensorEvent } from 'src/app/models/SensorEvent';

@Component({
  selector: 'app-list-events',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListEventsComponent implements OnInit {
  @Input() items: SensorEvent[];
  constructor() {}

  ngOnInit(): void {}
}
