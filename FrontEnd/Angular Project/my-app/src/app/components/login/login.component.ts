import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() idEmitter = new EventEmitter<string>();
  password: string = '';
  phone: string = '';

  // ScanUser:User={} as User;
  // private UserService:UsersService
  constructor(private http: HttpClient,
     private router: Router, 
     private UserService: UsersService,
    
     private authservice:UserAuthService) {
      

  }


  isuserlogged:boolean=false;
  login(){
    this.authservice.login(this.phone,this.password)
     this.isuserlogged=this.authservice.isUserLogged
  }








  ngOnInit(): void {
this.isuserlogged=this.authservice.isUserLogged
  }
  ngOnChanges(): void {

  }

}