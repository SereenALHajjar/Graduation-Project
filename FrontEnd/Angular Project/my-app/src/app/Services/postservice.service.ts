import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Post } from '../Models/post';

@Injectable({
  providedIn: 'root'
})
export class PostServicesService {
  httpOption;
  readonly url = '${environment.APIURL}/post';

  constructor(private httpClient: HttpClient) {this.httpOption={headers:new HttpHeaders({ 'Content-Type':'application/json',})} }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {//key one statuscode
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);//كي ثاني هوي الايرور شايل المسج او ديسكريبشن الخاص بالايرور
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    //write error details in generic error logلان الفوق بس لح يشوفن اليوز 
    //apiمعمول من ناحية الباك مشان لما يصير خطأ ابعتلو تفاصيلو
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  addPost(newPost:Post):Observable<Post>//,newSkill:Skill,newProjectlink:ProjectLink
  {
return this.httpClient.post<Post>('http://localhost:9992/addpost',JSON.stringify(newPost),this.httpOption)//لازم ابعتها على شكل جيسون سترينغ
.pipe(
  retry(2),
  catchError(this.handleError)
  )

  }
}
