import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { User } from '../Models/user';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  
  private isloggedSubject: BehaviorSubject<boolean>
  constructor(private http: HttpClient,
    private router: Router) {
    this.isloggedSubject = new BehaviorSubject<boolean>(this.isUserLogged);
  }
  login(phone: string, password: string) {
    //call api and get access token
    let bodyData = {
      "phone": phone,
      "password": password
    };
    this.http.post("http://localhost:9992/user/login", bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      if (resultData.status) {
        let userID = resultData.Id;
        let userFname=resultData.userFname;
        let userLname=resultData.userLname;
        localStorage.setItem("ID",userID);
        localStorage.setItem("UFN",userFname);
        localStorage.setItem("ULN",userLname);
      
        this.isloggedSubject.next(true);
        Swal.fire({
          position:'top',
          icon:'success',
          title:'تم تسجيل الدخول بنجاح',
          showConfirmButton:false,
          timer:1500
        })
        //alert('تم تسجيل الدخول بنجاح')
        this.router.navigateByUrl('/home')
      }
      else {
        Swal.fire({
          position:'top',
          icon:'success',
          title:'  كلمة السر أو الرقم غير صحيحات" ',
          showConfirmButton:false,
          timer:1500
        })
        
        //alert("Incorrect phon or password");
        console.log("Error login");
      }
    });
 
  }
  Createaccount(userRegisterForm: User){
    this.http.post("http://localhost:9992/user/create",userRegisterForm).subscribe((resultData: any) => {
      console.log(resultData);
      if (resultData.status) {
        let userID = resultData.Id;
        let userFname=resultData.userFname;
        let userLname=resultData.userLname;
        localStorage.setItem("ID",userID);
        localStorage.setItem("UFN",userFname);
        localStorage.setItem("ULN",userLname);
      
        this.isloggedSubject.next(true);
        Swal.fire({
          position:'top',
          icon:'success',
          title:' تم إنشاء الحساب بنجاح ',
          showConfirmButton:false,
          timer:1500
        })
        
        //alert("تم إنشاء الحساب بنجاح");
        this.router.navigateByUrl('/home');
      }
      else {
        Swal.fire({
          position:'top',
          icon:'success',
          title:' يجب أن تكون جميع الحقول مدخلة',
          showConfirmButton:false,
          timer:1500
        })
        
        //alert("يجب أن تكون جميع الحقول مدخلة");
        console.log("Error creataccount");
      }

    });
  }
  logout() {
    localStorage.removeItem("ID");
    localStorage.removeItem("UFN")
    localStorage.removeItem("ULN")
    this.isloggedSubject.next(false);
  }
  //read only prop
  get isUserLogged(): boolean {
    return (localStorage.getItem("ID")) ? true : false
  }
  
  
 
  getLoggedStatus(): Observable<boolean> {
    return this.isloggedSubject.asObservable();
  }

}