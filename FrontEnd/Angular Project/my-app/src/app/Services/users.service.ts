import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { ProjectLink } from '../Models/project-link';
import { Skill } from '../Models/skill';
import { User } from '../Models/user';
import { Skiilofusers } from '../Models/skiilofusers';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  //بياخد التايب حسب الانشلايزيشن
httpOption;//مشان الهيدر بدالة البوست لان هي الدالة بدا تشوف الهيدر قبل ماتشوف البودي
readonly url='${environment.APIURL}/user';
  constructor(private httpClient:HttpClient) { 
    this.httpOption={
        headers:new HttpHeaders({
        'Content-Type':'application/json',
        //Authorization:'my-auth-token'//بيطلب اكسيس توكين او بياخد اكسيس توكين او هوي اوثورايزيدapiلو ال
      })
    }
  }
  //logic handle error in service
  //ميثود لمعالجة الخطأ
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

  getAllUsers():Observable<User[]>
  {//من مجلد الانفيرونمينتurlبنجيب ال
  return this.httpClient.get<User[]>('${environment.APIURL}/user');//Domain Name
  }
  getUsersByID(userID:string):Observable<User>
  {
    return this.httpClient.post<User>('http://localhost:9992/getuserInfo',{id:userID});//query param
  }
  getUsersBySkill(userSkillID:number):Observable<User[]>
  {
    return this.httpClient.get<User[]>('${environment.APIURL}/user/${userSkillID}');
  }
  //ADDUSER
  addUser(newUser:User):Observable<User>//,newSkill:Skill,newProjectlink:ProjectLink
  {//طريقة اولى لمعالجة الخطأ
/*return this.httpClient.post<User>('${environment.APIURL}/user',JSON.stringify(newUser),this.httpOption)
.pipe(
  retry(2),
  catchError((err:HttpErrorResponse)=>{console.log(err);return throwError(()=>new Error('Post error'))})
)*/
return this.httpClient.post<User>('${environment.APIURL}/user/create',JSON.stringify(newUser),this.httpOption)//لازم ابعتها على شكل جيسون سترينغ
.pipe(//طريقة ثانية لمعالجة الخطأ
  retry(2),//مشان اتاكد انو المشكلة مانا مشكلة كونيكشن
 // catchError(this.handleError('addUser',newUser))
 catchError(this.handleError)
  )
//this.httpClient.post<User>('${environment.APIURL}/user',JSON.stringify(newSkill),this.httpOption),
//this.httpClient.post<User>('${environment.APIURL}/user',JSON.stringify(newProjectlink),this.httpOption);
//return this.httpClient.post<User>("http://localhost:9992/user",newUser);
  }
  //UPDATEUSER
  // يعني الاوبجيكت الجديدbodyاول بارمتر المسار وتاني بارمتر الشغلة يلي بدي ابعتها بال
  // addSkill(newSkill:Skill):Observable<Skill>
  // {
  //   return this.httpClient.post<Skill>('${environment.APIURL}/skill',JSON.stringify(newSkill),this.httpOption)
  // }
  // addSkillOfUsers(newSkillofusers:Skiilofusers):Observable<Skiilofusers>
  // {
  //   return this.httpClient.post<Skiilofusers>('${environment.APIURL}/skillofusers',JSON.stringify(newSkillofusers),this.httpOption)
  // }
  // addProjectLink(newProjectlink:ProjectLink):Observable<ProjectLink>
  // {
  //   return this.httpClient.post<ProjectLink>('${environment.APIURL}/project-links',JSON.stringify(newProjectlink),this.httpOption)
  // }
  CheckUser(phone:string,password:string):Observable<User>
  {
    return this.httpClient.post<User>('${environment.APIURL}/user/login',JSON.stringify({phone,password}),this.httpOption);
    ///http://localhost:3000/user?phone=968459912&&password=rama12345
    //'${environment.APIURL}/user?${phone}&&${password}'
  }

//   private apiUrl = 'http://localhost:9992';
//   idEmitter = new EventEmitter<number>();

//   login(phone:string,password:string):void{
//     const userDetails = {phone: phone, password: password};
//     this.httpClient.post<number>("http://localhost:9992/user/login",userDetails).subscribe(id=>{
//   this.idEmitter.emit(id);
// })

// login(phone:string,password:string):void{
//   const userDetails = {phone: phone, password: password};
//   this.httpClient.post<number>(`${this.apiUrl}/user/login`, userDetails).subscribe(
//     (id: number) => {
//       console.log(`User ID: ${id}`);
//       this.idEmitter.emit(id);
//     },
//     err => {
//       console.log(err);
//     }
//   );
// }
  //}
  updateUser(userID:number,UpdateUser:User):Observable<User>
  {
    return this.httpClient.patch<User>('${environment.APIURL}/user/${userID}',JSON.stringify(UpdateUser.password),this.httpOption)
  }
  //DELETEUSER
  deleteUser(userID:number)
  {

  }
}
