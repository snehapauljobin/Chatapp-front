import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatroomComponent } from './chatroom/chatroom.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForwardComponent } from './forward/forward.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { PersonalChatComponent } from './personal-chat/personal-chat.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path:'', component:LandingComponent
  },
  {
    path:'register', component:RegisterComponent
  },
  {
    path:'login', component:LoginComponent
  },
  {
    path:'dashboard', component:DashboardComponent
  },
  {
    path:'chatroom', component:ChatroomComponent
  },
  {
    path:'personalchat', component:PersonalChatComponent
  },
  {
    path:'forward', component:ForwardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
