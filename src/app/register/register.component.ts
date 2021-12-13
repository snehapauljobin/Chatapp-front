import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../chat.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  Customer={
    
    name:'',
    email:'',
    password:'',
  passwordcheck:'',
  status:'pending'
}
  constructor(private chatservice:ChatService,private router:Router) { }

  ngOnInit(): void {
  }
  AddUser(){
    console.log(this.Customer)
    this.chatservice.newUser(this.Customer)
    
   .subscribe(
     
     (res:any)=>{
      alert("Successfully saved the details")
      this.router.navigate(['/login']);
    
     },
     (err:any)=>{
      alert('Already exist')
      
     
    }
   
)
}
}

