import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../chat.service';
import { DetailsModel } from '../register/detailsmodel';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _router:Router,public chatservice:ChatService) { }
  userItem={
    name:'',
    email:'', 
  }
signupItem= new DetailsModel(null,null,null,null,null,null,null)
   emails:any
  ngOnInit(): void {
  }

  logoutUser()
  {
  this.signupItem.email=sessionStorage.getItem("loginmail");
 this.emails=sessionStorage.getItem('loginmail')
  this.chatservice.logOut(this.signupItem)
  // this.chatservice.loggoutuser(this.userItem) 
 console.log(this.signupItem.email)
  
    sessionStorage.removeItem('loginmail')
    sessionStorage.removeItem('token')
    localStorage.removeItem('token')
    localStorage.removeItem('loginmail')

    this._router.navigate(['/'])
  }
}
