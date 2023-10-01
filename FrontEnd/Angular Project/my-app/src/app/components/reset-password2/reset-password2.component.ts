import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/Services/users.service';
import { User } from 'src/app/Models/user';
@Component({
  selector: 'app-reset-password2',
  templateUrl: './reset-password2.component.html',
  styleUrls: ['./reset-password2.component.css']
})
export class ResetPassword2Component implements OnInit {
  newpassUser:User={} as User;


  constructor(private UserService: UsersService) {

   }
newpassuser(){
  const observer = {
    next: (newpassUser: User) => { alert('تم تغيير كلمة المرور بنجاح') },
    error: (err: Error) => { alert(err.message) }
  }
  
  this.UserService.updateUser(this.newpassUser._id,this.newpassUser).subscribe(observer)
}
  ngOnInit(): void {
  }

}
