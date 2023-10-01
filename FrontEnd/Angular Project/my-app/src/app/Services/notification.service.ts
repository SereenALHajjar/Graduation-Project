import { Injectable } from '@angular/core';
import {Notification} from '../ViewModels/notification';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient:HttpClient) { }
  getAllNotifs():Observable<Notification[]>{
      return this.httpClient.post<Notification[]>("http://localhost:9992/getnotif",{});
  }
  getCurrentDate():Date {
    return new Date;
   }
   getMaxDate():Date{
    let dateString = '2023-7-8';
    const dateParts = dateString.split('-');
    const year = parseInt(dateParts[0],10);
    const monthIndex = parseInt(dateParts[1],10)-1;
    const day = parseInt(dateParts[2],10);
    const maxdate = new Date(year,monthIndex, day);
    return maxdate ; 
   }
}
