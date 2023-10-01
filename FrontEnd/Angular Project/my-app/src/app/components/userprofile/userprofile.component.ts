import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { User } from 'src/app/Models/user';
import { OffercardService } from 'src/app/Services/offercard.service';
import { PostService } from 'src/app/Services/post.service';
import { UsersService } from 'src/app/Services/users.service';
import { Mypost } from 'src/app/ViewModels/mypost';
import { PostCard } from 'src/app/ViewModels/post-card';
import { UserRate } from 'src/app/ViewModels/user-rate';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent {
  rate:UserRate={rate : 0};
  user$!: Observable<User>;
  mypostresult:PostCard[]=[];
  UserObj:User={
    _id:0,
    fname:"",
    lname:"",
    phone:"",
    password:"",
    confirmpassword:"",
    gender:"",
    city:"",
    photo:"",
    birth_date:new Date,
    Skill:[],
    ProjectLink:[]

  };
  diffuser="";
  post_Id="";
  user_Id="";
  mypost!:Mypost;
constructor( 
  private UserService: UsersService,
  private OfferCardService:OffercardService,
  private datePipe :DatePipe,
  private postservice:PostService,
  private http :HttpClient,private activatedRoute:ActivatedRoute){

}

ngOnInit(): void {
  this.post_Id = String(this.activatedRoute.snapshot.paramMap.get("id"));
  if (this.post_Id){
    console.log(this.post_Id);
    let id = this.post_Id;
    this.http.get<User>(`http://localhost:9992/userprofile/${id}`).subscribe(user=>{
            this.UserObj = user;
            console.log(this.UserObj._id);
            this.http.post<UserRate>("http://localhost:9992/getrate",{user_id:this.UserObj._id}).subscribe(Rate => {this.rate=Rate;
            console.log(this.rate)});
            this.postservice.getPostsById(String(this.UserObj._id)).subscribe(posts=>{
              this.mypostresult=posts;
              console.log(this.mypostresult);
            })
          });
  }
  console.log(this.post_Id);
}

start(){



  console.log(this.diffuser);
  this.user$ = this.UserService.getUsersByID(this.diffuser);
console.log(this.user$);
this.http.post<UserRate>("http://localhost:9992/getrate",{user_id:this.diffuser}).subscribe(rate=>{this.rate=rate
console.log(this.rate)

 })
}


getDurationDate(pub_date:Date):string{
  const today =  moment() ; 
  const duration = moment.duration(today.diff(pub_date));
  return duration.humanize()
}
}
