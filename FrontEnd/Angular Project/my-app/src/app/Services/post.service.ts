import { Injectable } from '@angular/core';
import { Post } from '../Models/post';
import {PostCard} from '../ViewModels/post-card';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
 // private postList :Post[];
//  private postCardList :PostCard[]=[];
  

  constructor(private httpClient:HttpClient) {
    // this.postList = [
    //   {_id:1,user_id:1,title:'تصميم واجهة مستخدم و تجربة المستخدم (UI&UX)',
    //   description:'مطلوب مصمم واجهة مستخدم ذو خبرة و مشاريع سابقة لمعل واجهة ويب للتجارة الالكترونية بحوالي 20 صفحة ',
    //   type:['Web','Figma','Design'],max_date:this.getMaxDate(),pub_date:this.getCurrentDate()},
    //   {_id:2,user_id:2,title:' بناء متجر الكتروني لمتجر العاب',
    //   description:'مطلوب مطور Flutter لبناء تطبيق وموقع لمتجر الكتروني لمتجر العاب ',
    //   type:['Web','ِAndroid','Flutter','full-stack'],max_date:this.getMaxDate(),pub_date:this.getCurrentDate()},
    //   {_id:3,user_id:3,title:'بناء قاعدة بيانات لمشفى ',
    //   description:'مطلوب مبرمج لبناء قاعدة بيانات خاصة بمشفى تتضمن كل بيانات المرضى والموظفين والموارد الخاصة بالمشفى مع العلاقات الخاصة بها ',
    //   type:['DataBase','back-end'],max_date:this.getMaxDate(),pub_date:this.getCurrentDate()}
    // ]
   }
   getCurrentDate():Date {
    return new Date;
   }
   getMaxDate():Date{
    let dateString = '2023-7-8';
    const dateParts = dateString.split('-');
    const year = parseInt(dateParts[0],10);
    const monthIndex = parseInt(dateParts[1],10)-1;
    const day = parseInt(dateParts[2],10);
    const maxdate = new Date(year,monthIndex, day);
    return maxdate ; 
   }
   getAllPosts(): Observable<PostCard[]> {
      return this.httpClient.get<PostCard[]>("http://localhost:9992/getAllposts")
      //return this.postList;
   }
   getPostsById (id:string):Observable<PostCard[]>  {
      return this.httpClient.post<PostCard[]>('http://localhost:9992/userposts',{user_id:id})
      // let foundPost = this.postList.find(post => post._id == id);
      // return foundPost? foundPost:null ; 
   }
//    getPostByType (type : string[]) : Post | null {
//     let foundPost = this.postList.find(post => post.type == type);
//     return foundPost? foundPost:null ; 
//  }
}
