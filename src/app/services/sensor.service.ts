import { Sensor } from './../models/Sensor';
import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { handleHttpError } from '../utils/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SensorService {
  uri = 'sensors';
  sensorEndPoint = `${environment.apiUrl}/${this.uri}`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Sensor[]> {
    return this.http
      .get<Sensor[]>(this.sensorEndPoint)
      .pipe(catchError(handleHttpError));
  }

  createSensor(sensor: Sensor): Observable<Sensor> {
    return this.http
      .post<Sensor>(this.sensorEndPoint, sensor)
      .pipe(catchError(handleHttpError));
  }

  updateSensor(sensor: Sensor): Observable<Sensor> {
    return this.http
      .put<Sensor>(this.sensorEndPoint, sensor)
      .pipe(catchError(handleHttpError));
  }

  removeSensor(sensorId: string): Observable<Sensor & { _id: string }> {
    return this.http
      .delete<Sensor & { _id: string }>(this.sensorEndPoint + '/' + sensorId)
      .pipe(catchError(handleHttpError));
  }
}
