import { Component, OnInit } from '@angular/core';
import { SensorEvent } from 'src/app/models/SensorEvent';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormEventComponent implements OnInit {
  sensorForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit() {
    this.sensorForm = this.formBuilder.group({
      value: ['', Validators.required],
    });
  }

  get value() {
    return this.sensorForm.value;
  }

  get isValid() {
    return this.sensorForm.valid;
  }
}
