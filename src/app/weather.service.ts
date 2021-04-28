import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {WeatherData} from './weatherData';
@Injectable()
export class WeatherService {

  constructor(private http: HttpClient) {}
  url = 'http://api.openweathermap.org/data/2.5/forecast';
  apiKey = '82f27fcd9b88622f808c6a09d81b6497';
  getData(location: string) {
      return this.http.get(`${this.url}?q=${location}&APPID=${this.apiKey}`);
  }
}
