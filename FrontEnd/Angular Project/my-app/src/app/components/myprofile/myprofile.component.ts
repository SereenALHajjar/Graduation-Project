import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { UsersService } from 'src/app/Services/users.service';
import { PostServicesService } from 'src/app/Services/postservice.service';
import { Post } from 'src/app/Models/post';
import { Offer } from 'src/app/Models/offer';
import{OfferService} from 'src/app/Services/offer.service'
import { Offercard } from 'src/app/ViewModels/offercard';
import { OffercardService } from 'src/app/Services/offercard.service';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { PostCard } from 'src/app/ViewModels/post-card';
import { PostService } from 'src/app/Services/post.service';
import { HttpClient } from '@angular/common/http';
import { UserRate } from 'src/app/ViewModels/user-rate';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})

export class MyprofileComponent implements OnInit {
  
  user_Id:string=localStorage.getItem("ID") as string;
  mypostresult:PostCard[]=[];
  rate!:UserRate;
  OfferCardObj:Offercard={
    User_id:2,
    _id:1,
    numberOfacc:200,
    numberofreject:100,
    title:"UI/UX",
    max_date:new Date(Date.now(),),
    money:"300",
    accepted:1,
 
  }
UserObj!:User;
user$!: Observable<User>;
rate$ !:Observable<number>;
title:string;
offersList:Offercard[]
numberOfOffers=0;
numberOfAccepted=0;

  constructor(private OfferService:OfferService ,
      private UserService: UsersService,
      private PostServicesService:PostServicesService ,
      private OfferCardService:OffercardService,
      private datePipe :DatePipe,
      private postservice:PostService,
      private http :HttpClient,
      private activatedRoute:ActivatedRoute) {  
   this.title="تصميم واجهة مستخدم و تجربة مستخدم (UX/UI)  "
   //this.money="3000";
  let  user_id = localStorage.getItem("ID") as string;
   this.offersList=[this.OfferCardObj,this.OfferCardObj];

    console.log(user_id);
    // const diffuser = String(this.activatedRoute.snapshot.paramMap.get("id")); 
   this.OfferCardService.getAllOffersById(user_id).subscribe(offercard=>{
    this.offersList=offercard;
    this.numberOfOffers = this.offersList.length;
    for (let offer of this.offersList){
      if (offer['accepted']==1) { this.numberOfAccepted +=1 }
    }
  })
  }
  


  ngOnInit(): void {
    // let  user_id = localStorage.getItem("ID") as string;
 
    // let  user_id = localStorage.getItem("ID") as string;
    this.user$ = this.UserService.getUsersByID(this.user_Id);
console.log(this.user$);
this.postservice.getPostsById(this.user_Id).subscribe(posts=>{
  this.mypostresult=posts;
  this.http.post<UserRate>("http://localhost:9992/getrate",{user_id:this.user_Id}).subscribe(rate=>{this.rate=rate
 console.log(this.rate)
})
  console.log(this.mypostresult);
})
   
// this.rate$=
// this.http.post<UserRate>("http://localhost:9992/getrate",{user_id:this.user_Id}).subscribe(rate=>{this.rate=rate
//  console.log(this.rate)
// })

  }
  
getDurationDate(pub_date:Date):string{
  const today =  moment() ; 
  const duration = moment.duration(today.diff(pub_date));
  return duration.humanize()
}

}
