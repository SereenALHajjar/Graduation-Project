import { Injectable } from '@angular/core';
import { Search } from '../ViewModels/search';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchObj: Search = {}as Search;
  httpOption;
  constructor(private httpClient : HttpClient) { 
    this.httpOption = {
      headers : new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
  }

  // searhPost(title:string , web:string,mobile:string,
  //           desktop:string,learning:string,UI:string,AI:string ,
  //           skills:string [],max_date = Date , city:string){


  // }
  searchPost(newSearch:Search):Observable<Search>{
    return this.httpClient.post<Search>("http://localhost:9992/search",JSON.stringify(newSearch),this.httpOption);
  }
}
