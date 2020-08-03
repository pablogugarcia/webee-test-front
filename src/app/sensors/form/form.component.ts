import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  items;
  sensorForm;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.sensorForm = this.formBuilder.group({
      name: '',
      address: ''
    });
  }

  ngOnInit() {

  }

  onSubmit(sensorData) {
    // Process checkout data here
    console.log(sensorData);
  }
}
