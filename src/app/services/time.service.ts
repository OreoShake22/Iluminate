import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  url = 'http://worldtimeapi.org/api/timezone/Europe/Madrid';
  data:string;
  constructor(public http: HttpClient) {
    
  }

  getHour(){
    return new Promise(resolve=>{
      this.http.get(this.url).subscribe(data=>{
          resolve(data['datetime']);
      },error=>{
        console.log(error);
      });
    });
  }
}