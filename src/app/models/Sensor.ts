export class Sensor {
  name: string;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  active: boolean;
  minval: number;
  maxval: number;
}
