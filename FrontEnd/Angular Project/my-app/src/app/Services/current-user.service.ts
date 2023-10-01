import { Injectable } from '@angular/core';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  currentUserId:string="1";
  //currentUser : User;

  constructor() { 

   }
   
}
