import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../chat.service';
import { DetailsModel } from '../register/detailsmodel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private chatservice:ChatService,private router:Router) { }
  users!:DetailsModel[];
  UserArray:Array<{email:String,userID:String}> = [];
  userItem={
    name:'',
    email:'', 
  }
 
  
    ngOnInit(): void {
    
  let loginmail=sessionStorage.getItem("loginmail");
  console.log(loginmail);
  
  this.chatservice.userprofile(loginmail)
  .subscribe((data)=>{
    this.userItem=JSON.parse(JSON.stringify(data))
    console.log(this.userItem)
  })

  setInterval(()=>{
  this.chatservice.otherusers(loginmail)
  .subscribe((data)=>{
    this.users=JSON.parse(JSON.stringify(data))
    // console.log(this.users)
  })
},1000)

// this.chatservice.userloggedIn()
// .subscribe(data=> this.UserArray.push(data));
// console.log(this.UserArray)

    }
    getindvuser(user:any){
      sessionStorage.setItem("indvuserId", user._id.toString())
      sessionStorage.setItem("recevmail", user.email.toString())
      this.router.navigate(['personalchat']);
      
   }

  }
  