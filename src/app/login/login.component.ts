import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  User={
  
    email:'',
    password:'',
    status:'confirmed'
  }
  
  UserArray:Array<{email:String,userID:String}> = [];
  constructor(private chatservice:ChatService, private router:Router) { }

  ngOnInit(): void {
  }
  loginUser(){
    console.log(this.User.email)
    sessionStorage.setItem("loginmail",this.User.email.toString())
    sessionStorage.setItem("user",this .User.toString())
    // let logmail=localStorage.getItem("loginmail");
    // console.log(employrmail)
    
      this.chatservice.loginUser(this.User)
      .subscribe(
        (res:any)=>{
          sessionStorage.setItem('token',res.token)
          alert('Successfully logged in');
          this.router.navigate(['/dashboard']);
        },
        (err:any)=>{
          alert("Credentials are not proper")
        }
      )
      // this.chatservice.logguser(this.User) 
      // .subscribe((data: { email: String; userID: String; })=>this.UserArray.push(data));
      // console.log(this.UserArray)
      }
      
    }
