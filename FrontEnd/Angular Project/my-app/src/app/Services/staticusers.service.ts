import { Injectable } from '@angular/core';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class StaticusersService {
  private Userlist:User [];

  constructor() { 
this.Userlist=[
//{id:100,fname:"راما",lname:"دبدوب",phone:"968459912",password:"rama123", register_date:"١/٢/٢٠٢٣", birth_date:"١/٢/٢٠٠٠",gender:"انثى",city:"حمص",photo:""},
//{id:200,fname:"أدهم",lname:"دبدوب",phone:"945926781",password:"adham12345", register_date:"٢/٢/٢٠٢٢", birth_date:"٦/٨/١٩٩١",gender:"ذكر",city:"حماة",photo:""}
] }
getAllUser():User[]
{
  return this.Userlist;
}

}
