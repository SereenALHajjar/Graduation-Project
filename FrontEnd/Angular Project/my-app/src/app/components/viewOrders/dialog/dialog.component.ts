import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Offer } from 'src/app/Models/offer';
import { CurrentUserService } from 'src/app/Services/current-user.service';
import { OfferServiceService } from 'src/app/Services/offer-service.service';
import {Location} from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  offerForm:FormGroup;
  
  
  constructor(public dialogRef:MatDialogRef<DialogComponent>
             ,private datePipe:DatePipe
             ,@Inject(MAT_DIALOG_DATA) public data: any
             ,private offerService:OfferServiceService
             ,private currentuser:CurrentUserService
             ,private _location: Location
             ,private router: Router)
  {
    
    this.offerForm = new FormGroup({
      
      user_id:new FormControl(localStorage.getItem("ID")),
      post_id:new FormControl(this.post.post_id),
      money:new FormControl(''),
      max_date:new FormControl(''),
      pub_date:new FormControl(this.datePipe.transform(new Date(), "yyyy-MM-dd")),
      accepted:new FormControl(2),
    });
    console.log(localStorage.getItem("ID"),localStorage.getItem("ULN"));

  }

  close(){
    this.dialogRef.close();
    // this.router.navigateByUrl('search');
    // this._location.back();
    // this.reload.emit(true);
    // this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
    //   this.router.navigate(['Your actualComponent']);
  // });
  }
  get post(){
    return this.data.post;
  }
  getPostTitle(){
    return this.post.title;
  }
  submit(){
    const OfferValues  = this.offerForm.value;
    console.log(OfferValues);
    
    const offerObj :Offer = {
      
      user_id:OfferValues.user_id,
      post_id:OfferValues.post_id,
      money:OfferValues.money,
      max_date:OfferValues.max_date,
      pub_date:OfferValues.pub_date,
      accepted:OfferValues.accepted
    } 
    console.log("offerObj",offerObj);
    this.offerService.addOffer(offerObj).subscribe((data:any) =>{
      console.log(data)
      if (data.status){
        
        console.log("successful");
      }
      else {
        console.log("error");
      }
    });
    console.log(offerObj);
    console.log(this.post.post_id)
    window.location.reload()
    this.close();
    // let offerObj:Offer = this.offerForm as Offer
  }

}
