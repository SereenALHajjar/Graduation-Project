import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Offer } from '../Models/offer';
import { catchError, Observable, retry, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private httpClient:HttpClient) { }
  readonly url='${environment.APIURL}/Offer';
  // getAllOffer():Observable<Offer[]>
  // {//من مجلد الانفيرونمينتurlبنجيب ال
  // return this.httpClient.get<Offer[]>('${environment.APIURL}/Offer');//Domain Name
  // }
  // getAllOfferByID(userID:number):Observable<Offer[]>
  // {
  //   return this.httpClient.get<Offer[]>('${environment.APIURL}/Offer/${userID}');//query param
  // }
}
