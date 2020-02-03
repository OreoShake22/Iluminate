import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  url = 'https://worldtimeapi.org/api/timezone/Europe/Madrid';
  data:string;
  constructor(public http: HttpClient) {
    
  }

  getHour(){
    return new Promise(resolve=>{
      this.http.get(this.url).subscribe(data=>{
          resolve(data);
      },error=>{
        console.log(error);
      });
    });
  }
}