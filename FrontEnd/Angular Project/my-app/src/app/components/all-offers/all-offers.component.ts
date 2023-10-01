import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import * as moment from 'moment';
import { AllOffers } from 'src/app/ViewModels/all-offers';

@Component({
  selector: 'app-all-offers',
  templateUrl: './all-offers.component.html',
  styleUrls: ['./all-offers.component.css']
})
export class AllOffersComponent {
   alloffersObj!:AllOffers;
   constructor(private http:HttpClient){
        this.http.get<AllOffers>('http://localhost:9992/all-offers/:post_id').subscribe(data=>{
          this.alloffersObj=data;
          console.log(data);
        })
   }

   getDurationDate(pub_date:Date):string{
    const today =  moment() ; 
    const duration = moment.duration(today.diff(pub_date));
    return duration.humanize()
  }
}
