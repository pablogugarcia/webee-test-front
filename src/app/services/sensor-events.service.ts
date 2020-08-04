import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SensorEvent } from '../models/SensorEvent';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { handleHttpError } from '../utils/http';

@Injectable({
  providedIn: 'root',
})
export class SensorEventsService {
  uri = 'sensor-events';
  sensorEndPoint = `${environment.apiUrl}/${this.uri}`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<SensorEvent[]> {
    return this.http
      .get<SensorEvent[]>(this.sensorEndPoint)
      .pipe(catchError(handleHttpError));
  }

  addSensorEvent(event: {
    id: string;
    value: number;
  }): Observable<SensorEvent> {
    console.log(event.value)
    const fixIfNotNumber = {
      id: event.id,
      value: Number(event.value),
    };
    console.log(fixIfNotNumber)
    if (isNaN(fixIfNotNumber.value)) {
      throw new Error('Value must be a number');
    }
    return this.http
      .post<SensorEvent>(this.sensorEndPoint, fixIfNotNumber)
      .pipe(catchError(handleHttpError));
  }

  getBySensorId(id: string): Observable<SensorEvent[]> {
    return this.http
      .get<SensorEvent[]>(this.sensorEndPoint + '/' +  id)
      .pipe(catchError(handleHttpError));
  }
}
