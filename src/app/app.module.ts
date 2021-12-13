import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ChatService } from './chat.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ConfirmequalValidatorDirective } from './shared/confirm-equal-validator.directive';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TokenInterceptorService } from './token-interceptor.service';
import { AntiqueComponent } from './antique/antique.component';
import { PersonalChatComponent } from './personal-chat/personal-chat.component';
import { ForwardComponent } from './forward/forward.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingComponent,
    RegisterComponent,
    LoginComponent,
    ConfirmequalValidatorDirective,
    ChatroomComponent,
    DashboardComponent,
    AntiqueComponent,
    PersonalChatComponent,
    ForwardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ChatService,
  {
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
