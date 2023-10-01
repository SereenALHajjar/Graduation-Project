import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Offer } from '../Models/offer';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class OfferServiceService {
  httpOption;

  constructor(private http:HttpClient,private userService:UsersService) {
    this.httpOption={
      headers:new HttpHeaders({
      'Content-Type':'application/json',
      //Authorization:'my-auth-token'//بيطلب اكسيس توكين او بياخد اكسيس توكين او هوي اوثورايزيدapiلو ال
    })
   }

}

  addOffer(newOffer:Offer){
    return this.http.post("http://localhost:9992/addoffer",JSON.stringify(newOffer),this.httpOption);

  }
  getOfferById(id:number):Observable<Offer>{
    return this.http.get<Offer>(`http://localhost:9992/Offer/${id}`)
  }
  getUserByOfferId(id:string):Observable<User>{
     return this.userService.getUsersByID(id)
  }
  ///not used
  // updateOffer(offer_id:number,updatedOffer:Offer):Observable<Offer>{
  //   return this.http.put<Offer>(`http://localhost:3000/Offer/${offer_id}`,updatedOffer,this.httpOption);
  // }
}
