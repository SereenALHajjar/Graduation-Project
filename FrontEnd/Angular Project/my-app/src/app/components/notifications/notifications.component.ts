import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/Services/notification.service';
import {Notification} from 'src/app/ViewModels/notification';
import {User} from 'src/app//Models/user';
import { Offer } from 'src/app/Models/offer';

import * as moment from 'moment';
import { OfferServiceService } from 'src/app/Services/offer-service.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifList : Notification[]=[];
  offerObj!:Offer ;
  
  

  constructor(private notifService:NotificationService,private offerService:OfferServiceService,private http:HttpClient) { }

  ngOnInit(): void {
    this.http.post<Notification[]>("http://localhost:9992/getnotif",{id:localStorage.getItem("ID") as string}).subscribe(
      notifs =>
      {this.notifList = notifs
      console.log(this.notifList);}
    )
    

  }
  getDurationDate(pub_date:Date):string{
    const today =  moment() ; 
    const duration = moment.duration(today.diff(pub_date));
    return duration.humanize()
  }
  accepte(offer_id:number){
  this.offerService.getOfferById(offer_id).subscribe(
    offer =>
      {
          console.log(offer);
          this.offerObj = offer;
      },
      error => {
        console.log(error);
      },
      () => {
        console.log("complete : ",this.offerObj);
        if (this.offerObj){
          this.offerObj.accepted=1;
          // this.offerService.updateOffer(offer_id,this.offerObj).subscribe()
          this.http.put<Offer>(`http://localhost:9992/offer/${offer_id}`,this.offerObj).subscribe(data =>{
            this.http.post<string>("http://localhost:9992/adduserlist",{first_id:localStorage.getItem("ID") as string,second_id:this.offerObj.user_id,date:new Date}).subscribe(data => console.log(data))
          console.log(data)
          if (data){this.offerService.getOfferById(offer_id).subscribe(offer =>
            console.log("after",offer))}
            });
        }
      }
  //     //console.log(offer.money)
      
      );    
  }
  delete(offer_id:number){
    this.offerService.getOfferById(offer_id).subscribe(
      offer =>
        {
            console.log(offer);
            this.offerObj = offer;
        },
        error => {
          console.log(error);
        },
        () => {
          console.log("complete : ",this.offerObj);
          if (this.offerObj){
            this.offerObj.accepted=0;
            // this.offerService.updateOffer(offer_id,this.offerObj).subscribe()
            this.http.put<Offer>(`http://localhost:3000/Offer/${offer_id}`,this.offerObj).subscribe(data =>{
            console.log(data)
            if (data){this.offerService.getOfferById(offer_id).subscribe(offer =>
              console.log("after",offer))}
              });
          }
        }
    //     //console.log(offer.money)
        
        );   
    // this.http.delete(`http://localhost:3000/Offer/${offer_id}`).subscribe()
  }

}
