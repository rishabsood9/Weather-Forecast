import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { WeatherData } from './weatherData';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayCurrent = false;
  displayFiveElements = false;
  title = 'WeatherApp';
  location: string;
  result: any;
  report: Array<WeatherData> = [];
  currentDate: string;
  currentHumidity: string;
  currentWindSpeed: string;
  currentTemp: string;
  constructor(private data: WeatherService) {
  }
  showWeatherReport(loc: string) {
    this.displayCurrent = true;
    this.report = [];
    this.location = loc;

    this.data.getData(this.location).subscribe((d: any) => {
      console.log(d);
      this.result = d.list;
      for (let i = 0; i < this.result.length; i = i + 8) {
        this.report.push(this.result[i] as WeatherData);
        this.result[i].main.celTemp = ((parseFloat(this.result[i].main.temp) - 273).toFixed(2)).toString();
        this.result[i].main.celMinTemp = ((parseFloat(this.result[i].main.temp_min) - 273).toFixed(2)).toString();
        this.result[i].main.celMaxTemp = ((parseFloat(this.result[i].main.temp_max) - 273).toFixed(2)).toString();
      }
      this.displayFiveElements = true;
      this.currentDate = this.report[0].dt_txt;
      this.currentWindSpeed = this.report[0].wind.speed + ' mph ',
      this.currentHumidity = this.report[0].main.humidity + ' % ',
        // tslint:disable-next-line:radix
      this.currentTemp = this.report[0].main.celTemp;
    }, (error) => console.log((error)));
  }
}
