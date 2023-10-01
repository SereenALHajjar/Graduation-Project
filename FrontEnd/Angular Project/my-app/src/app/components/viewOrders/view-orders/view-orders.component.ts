import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/Models/post';
import { User } from 'src/app/Models/user';
import { PostService } from 'src/app/Services/post.service';
import { UsersService } from 'src/app/Services/users.service';
import { catchError, Observable, retry, throwError } from 'rxjs';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import {PostCard} from 'src/app/ViewModels/post-card';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// import {DialogComponent} fro

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit, OnChanges {
  // postsList : Post [] = [];
  @Input() postsList : PostCard [] = [];
  @Input() profile!:Observable< PostCard []> ;
  @Output() pressTag: EventEmitter<string>;
//  @Input() sentpost:PostCard[]=[];
  // UserObj:User={
  //   _id:1,
  //   fname:'',


  // };
  

  

  constructor(private postservice:PostService,
     private userservice:UsersService , public dialog:MatDialog 
     ,private UserService : UsersService,private http:HttpClient,
     private router:Router )
   {
      this.pressTag = new EventEmitter<string>();
   }

  ngOnInit(): void {
    // this.postservice.getAllPosts().subscribe(posts =>
    //   this.postsList = posts)
      let user_id=localStorage.getItem("ID") as string;
      this.profile=this.postservice.getPostsById(user_id)
      console.log(this.profile)
      this.postservice.getAllPosts().subscribe(posts =>
        this.postsList = posts)
    
    
   // this.postsList = this.postservice.getAllPosts();
    // this.getNameById(1)
    // console.log(this.postsList[0]);
  }
  ngOnChanges():void {
    // this.postsList = this.postservice.getAllPost();
    // console.log(this.postsList[0]);
  }
  // trackbyfunc(index:number , post:Post):number {
  //   return post._id;
  // }
  // getNameById(id:number):string {
  //   let userobj !:User;
    
  //   this.userservice.getUsersByID(id).subscribe(user => {userobj = user });
  //   let name = userobj.fname;
  //   return name;
    
  // }
  getDurationDate(pub_date:Date):string{
    const today =  moment() ; 
    const duration = moment.duration(today.diff(pub_date));
    return duration.humanize()
  }
  openDialog(post:PostCard){
      const dialogRef = this.dialog.open(DialogComponent,{data:{post:post}});
      dialogRef.afterClosed().subscribe((result)=>
      console.log(`result of dialog ${result}`));
  }
  searchByTag(tag:string){
    this.pressTag.emit(tag);
    console.log(tag);
    // this.postsList=
  }
  onreload(reload:boolean){
    if (reload==true){
        this.ngOnInit()
    }
  }

  goToProfile(post_id:string){
    let userObj :User;
       this.http.post<User>("http://localhost:9992/getuserbypost",{post_id:post_id}).subscribe(user=>{
        userObj=user;
        console.log(user._id);
      this.router.navigate(['/userprofile',{id:user._id}])
       })
       
  }
}
