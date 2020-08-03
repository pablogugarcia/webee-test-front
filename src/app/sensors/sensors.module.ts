import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SensorsRoutingModule } from './sensors-routing.module';
import { SensorListComponent } from './sensor-list/sensor-list.component';


@NgModule({
  declarations: [ SensorListComponent],
  imports: [
    CommonModule,
    SensorsRoutingModule
  ]
})
export class SensorsModule { }
