import { createComponent, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateaccountComponent } from './components/createaccount/createaccount.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundcomponentComponent } from './components/notfoundcomponent/notfoundcomponent.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { ResetPassword1Component } from './components/reset-password1/reset-password1.component';
import { ResetPassword2Component } from './components/reset-password2/reset-password2.component';
import { ChatComponent } from './components/chat/chat.component';
import { HomeComponent } from './components/home/home.component';
import { ContentsComponent } from './components/contents/contents.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { ViewOrdersComponent } from './components/viewOrders/view-orders/view-orders.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { SearchComponent } from './components/viewOrders/search/search.component';
import { authGuard } from './Gaurds/auth-guard.guard';
import {ViewPostComponent} from './components/view-post/view-post.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';

const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'password-reset', component: PasswordResetComponent },
  { path: 'reset-password1', component: ResetPassword1Component },
  { path: 'reset-password2', component: ResetPassword2Component },
  { path: 'createaccount', component: CreateaccountComponent },
  { path: 'chat/:id', component: ChatComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contents', component:ContentsComponent },
  { path: 'edit-profile', component:EditProfileComponent},
  { path: 'myprofile', component:MyprofileComponent},
  {path:'vieworders',component:ViewOrdersComponent},
  {path:'search',component:SearchComponent},
  {path:'notif',component:NotificationsComponent},
  {path:'myPost/:post_id',component:ViewPostComponent},
  {path:'userprofile/:id',component:UserprofileComponent},
  { path: '**', component: NotfoundcomponentComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
