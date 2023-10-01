import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Mypost } from 'src/app/ViewModels/mypost';
import { UserRate } from 'src/app/ViewModels/user-rate';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../viewOrders/dialog/dialog.component';
import { PostCard } from 'src/app/ViewModels/post-card';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
      myPost !:Mypost;
      rate! :UserRate ;
      post_Id:string="64ceb33bbfee1c322be5a799";
      postCard:PostCard={
        post_id:'',
        title:'',
        description:'',
        userName:'',
        pub_date:new Date,
        numberOfViews:0,
        numberOfOrders:0,
        type:[],
        avgOfOreders:0
      };
     constructor(private http:HttpClient,private activateRouter:ActivatedRoute,public dialog:MatDialog ){

     }

      ngOnInit(): void {
        this.post_Id =String (this.activateRouter.snapshot.paramMap.get('post_id'))
        if (this.post_Id){
          this.http.get<Mypost>(`http://localhost:9992/myPost/${this.post_Id}`).subscribe(post=>{
            this.myPost = post;
            console.log(this.myPost);
            this.http.post<UserRate>("http://localhost:9992/getrate",{user_id:localStorage.getItem("ID") as string}).subscribe(Rate => {this.rate=Rate;
            console.log(this.rate)});
            console.log("post id ",this.post_Id)
        this.postCard.post_id=this.post_Id;
        this.postCard.title = this.myPost.title;
        this.postCard.description = this.myPost.description;
        this.postCard.userName = this.myPost.fname + " " + this.myPost.lname;
        this.postCard.pub_date = this.myPost.pub_date;
        this.postCard.numberOfViews = 0;
        this.postCard.numberOfOrders = this.myPost.cnt;
        this.postCard.type = this.myPost.type;
        this.postCard.avgOfOreders = this.myPost.avg;
        console.log(this.postCard);
          });
        //   this.http.post<UserRate>("http://localhost:9992/getrate",{user_id:localStorage.getItem("ID") as string}).subscribe(Rate => {this.rate=Rate;
        // console.log(this.rate)});

      }
    
        // console.log("post id ",this.post_Id)
        // this.postCard.post_id=this.post_Id;
        // this.postCard.title = this.myPost.title;
        // this.postCard.description = this.myPost.description;
        // this.postCard.userName = this.myPost.fname + " " + this.myPost.lname;
        // this.postCard.pub_date = this.myPost.pub_date;
        // this.postCard.numberOfViews = 0;
        // this.postCard.numberOfOrders = this.myPost.cnt;
        // this.postCard.type = this.myPost.type;
        // this.postCard.avgOfOreders = this.myPost.avg;
        // console.log(this.postCard);
      
    }
delay(num:number){
  return new Promise(resolve => setTimeout(resolve,num));
}

      getDurationDate(pub_date:Date):string{
        const today =  moment() ; 
        const duration = moment.duration(today.diff(pub_date));
        return duration.humanize()
      }
      // openDialog(post:PostCard){
      //     const dialogRef = this.dialog.open(DialogComponent,{data:{post:post}});
      //     dialogRef.afterClosed().subscribe((result)=>
      //     console.log(`result of dialog ${result}`));
      // }
      openDialog(post:PostCard){
        const dialogRef = this.dialog.open(DialogComponent,{data:{post:post}});
        dialogRef.afterClosed().subscribe((result)=>
        console.log(`result of dialog ${result}`));
    }
}
