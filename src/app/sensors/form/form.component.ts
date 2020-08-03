import { Sensor } from './../../models/Sensor';
import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  ValidationErrors,
  Validators,
} from '@angular/forms';

export interface SensorFormValues {
  name: string;
  active: boolean;
  maxval: number;
  minval: number;
  latitude: number;
  longitude: number;
}

export const checkValidRange: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const max = control.get('maxval');
  const min = control.get('minval');

  if (max.value < min.value || min.value < 0) {
    max.setErrors({ notValid: 'Invalid' });
  }

  return null;
};

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() values: Sensor;

  sensorForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit() {
    this.sensorForm = this.formBuilder.group(
      {
        name: [this.values?.name ?? '', Validators.required],
        active: [this.values?.active ?? false, Validators.required],
        maxval: [this.values?.maxval ?? 0, Validators.required],
        minval: [this.values?.minval ?? 0, Validators.required],
        latitude: [
          this.values?.location.coordinates[0] ?? '',
          Validators.required,
        ],
        longitude: [
          this.values?.location.coordinates[1] ?? '',
          Validators.required,
        ],
      },
      { validators: checkValidRange }
    );
  }

  get value() {
    return this.sensorForm.value;
  }

  get isValid() {
    return this.sensorForm.valid;
  }
}
