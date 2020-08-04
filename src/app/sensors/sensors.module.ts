import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SensorsRoutingModule } from './sensors-routing.module';
import { SensorListComponent } from './sensor-list/sensor-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EventsComponent } from './events/events.component';
import { FormEventComponent } from './events/form/form.component';
import { ListEventsComponent } from './events/list/list.component';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [
    SensorListComponent,
    DialogComponent,
    FormComponent,
    EventsComponent,
    FormEventComponent,
    ListEventsComponent,
  ],
  imports: [
    CommonModule,
    SensorsRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatListModule
  ],
})
export class SensorsModule {}
