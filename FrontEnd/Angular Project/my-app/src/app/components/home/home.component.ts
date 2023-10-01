import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Home } from 'src/app/ViewModels/home';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users : number =0 ;
  offers : number =0 ;
  posts : number =0;
  devlopers : number =0;
  constructor(private http : HttpClient) {
    this.http.post<Home>("http://localhost:9992/home",{ok:"ok"}).subscribe(data => {
      this.users = data.users;
      this.offers = data.offer;
      this.posts = data.posts;
      this.devlopers = data.developers
    })

   }

  ngOnInit(): void {
   
  }

}

