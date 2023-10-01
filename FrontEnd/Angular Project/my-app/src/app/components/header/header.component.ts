import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/Services/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isUserLogged:boolean=true;
  isuserlogged:boolean=false;
  userfname:string="";
  userlname:string="";
  username:string=""
  // username:string;
  constructor(private authService:UserAuthService) {
    
  //   this.userfname=localStorage.getItem("UFN")as string
  //   this.userlname=localStorage.getItem("ULN")as string
  //   this.username=this.userlname+""+this.userfname;

    
  // // this.username=this.authService.login
  //  this.isUserLogged=this.authService.isUserLogged
   }
 logout(){
    this.authService.logout()
     this.isuserlogged=this.authService.isUserLogged
  }
  ngOnInit(): void {
    this.userfname=localStorage.getItem("UFN")as string
    this.userlname=localStorage.getItem("ULN")as string
    this.username=this.userfname+" "+this.userlname;

    
  // this.username=this.authService.login
   this.isUserLogged=this.authService.isUserLogged
    // عم اخدها مرة وحدة بس لهيك عملنا سبجيكت
   // this.isUserLogged= this.authService.isUserLogged
   this.authService.getLoggedStatus().subscribe(status=>{
    this.isUserLogged=status;
  });
  }

}