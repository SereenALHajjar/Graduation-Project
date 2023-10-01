import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as io from 'socket.io-client';
import { User } from 'src/app/Models/user';
import { MessageList } from 'src/app/ViewModels/message-list';
import { Userlist } from 'src/app/ViewModels/userlist';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  userName = '';
  message = '';
  second_id="";

  userList: Userlist[] = [] ;
  list:MessageList[]=[];
  messageList: 
  {message: string,  mine: boolean , date:Date}[] = [];
  socket: any;
  constructor(private http : HttpClient , private activateRouter:ActivatedRoute) { }
 
  ngOnInit(): void {
     this.second_id =String (this.activateRouter.snapshot.paramMap.get('id'))
     if (this.second_id)
   { this.http.post<Userlist[]>("http://localhost:9992/users",{id:localStorage.getItem("ID") as string  }).subscribe(list =>{
      this.userList = list

    })
    this.http.post<User>("http://localhost:9992/getuserInfo",{id:this.second_id}).subscribe(user=>{
      this.userName = user[0].fname + user[0].lname ;
      
    })
    this.http.post<MessageList[]>("http://localhost:9992/messagelist",{id:localStorage.getItem("ID")}).subscribe(mlist=>{
      this.list=mlist;
    })
    for (let item of this.list){
      if (item.sender_id==localStorage.getItem("ID") as string)
      {this.messageList.push({message:item.content,mine:true,date:item.date})}
      else {
        this.messageList.push({message:item.content,mine:false,date:item.date})
      }
      
    }
  }
  }
  sendMessage():void
  {
    this.messageList.push({message : this.message , mine:true , date:new Date()}) ;
    this.http.post<string>("http://localhost:9992/sendmessage",{sender_id: localStorage.getItem("ID") as string ,receiver: this.second_id,content:this.message,date:new Date()}).subscribe(data=>console.log(data))
    this.message="" ;
  }

}
