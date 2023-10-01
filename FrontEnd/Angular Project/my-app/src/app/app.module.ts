import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// import { MatIconModule } from '@angular/material/icon';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';

import { CreateaccountComponent } from './components/createaccount/createaccount.component';
import { NotfoundcomponentComponent } from './components/notfoundcomponent/notfoundcomponent.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { MainlayoutComponent } from './components/mainlayout/mainlayout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { ResetPassword1Component } from './components/reset-password1/reset-password1.component';
import { ResetPassword2Component } from './components/reset-password2/reset-password2.component';
//import {MatFormFieldModule} from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TreeViewModule} from '@syncfusion/ej2-angular-navigations';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DropDownTreeModule } from '@syncfusion/ej2-angular-dropdowns';
import { DatePipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ContentsComponent } from './components/contents/contents.component';
import { ChatComponent } from './components/chat/chat.component';
import { HomeComponent } from './components/home/home.component';
import { ViewOrdersComponent } from './components/viewOrders/view-orders/view-orders.component';
import { SearchComponent } from './components/viewOrders/search/search.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
//import { DropdownModule } from 'primeng/dropdown';
import { TreeSelectModule } from 'primeng/treeselect';
import { DialogComponent } from './components/viewOrders/dialog/dialog.component';
//import { TreeSelectModule } from 'primeng/treeselect';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ViewPostComponent } from './components/view-post/view-post.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { FooterComponent } from './components/footer/footer.component';
import { AllOffersComponent } from './components/all-offers/all-offers.component';


@NgModule({
  declarations: [
    
    AppComponent,
    HeaderComponent,

    LoginComponent,

    CreateaccountComponent,
    NotfoundcomponentComponent,
    PasswordResetComponent,
    MainlayoutComponent,
    ResetPassword1Component,
    ResetPassword2Component,
    MyprofileComponent,
    EditProfileComponent,
    ContentsComponent,
    ChatComponent,
    HomeComponent,
    ViewOrdersComponent,
    SearchComponent,
    NotificationsComponent,
    DialogComponent,
    ViewPostComponent,
    UserprofileComponent,
    FooterComponent,
    AllOffersComponent,
   
  ],
  imports: [
    //DropdownModule,
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
     CommonModule,
   
     BrowserAnimationsModule,
     MatButtonModule,
     MatDialogModule,
     TreeViewModule,
     DropDownListModule,
     DropDownTreeModule,
     
     CardModule,
     TreeSelectModule,
     NgbModule,
  ],
  exports: [
    // MatIconModule
],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
