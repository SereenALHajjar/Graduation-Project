import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Offercard } from '../ViewModels/offercard';
@Injectable({
  providedIn: 'root'
})
export class OffercardService {

  constructor(private httpClient: HttpClient) {


   }
   getAllOffersById(id:string):Observable<Offercard[]>
   {return  this.httpClient.post<Offercard[]>('http://localhost:9992/offersuser',{user_id:id})
  }
}
