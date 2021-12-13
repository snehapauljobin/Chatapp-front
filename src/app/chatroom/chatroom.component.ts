import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent {
    roomz:String | undefined;
    chatHistory:Array<{user:String,message:String,room:String,created:String}> = [];
  user:String | undefined;
    room:String | undefined;
    messageText:String | undefined;
    messageArray:Array<{user:String,message:String,userID:String}> = [];
    onlineusers:Array<{user:String}>=[]
    
    constructor(private _chatService:ChatService){
        
        this._chatService.newUserJoined()
        .subscribe(data=> this.messageArray.push(data));
console.log(this.messageArray)

        this._chatService.userLeftRoom()
        .subscribe(data=>this.messageArray.push(data));

        this._chatService.newMessageReceived()
        .subscribe(data=>this.messageArray.push(data));


        
        // this._chatService.userloggedIn()
        // .subscribe((data: { user: String; })=>this.onlineusers.push(data))
        // console.log(this.onlineusers)
    }
    imageUrl:any=undefined;
    // selectedFile:File=null;
    imagefile:any;
    image:string='';
   
    onFileSelected(event:any){
    if(event.target.files){
  
      var reader=new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(event:any)=>{
      this.imageUrl=reader.result;
      
      }
  this.imagefile=<File>event.target.files[0];
      }
    
  
   this.image=this.imagefile.name;
  
   
      }
  

    join(){
        let loginmail=sessionStorage.getItem("loginmail");
        this._chatService.joinRoom({user:loginmail, room:this.room});
    }

    leave(){
        let loginmail=sessionStorage.getItem("loginmail");
        this._chatService.leaveRoom({user:loginmail, room:this.room});
    }

    sendMessage()
    {
        let loginmail=sessionStorage.getItem("loginmail");
        this._chatService.sendMessage({user:loginmail, room:this.room, message:this.messageText});
    }
    // sendImage(){
    //     this._chatService.sendImage({user:this.user, room:this.room, image:this.imageUrl})
    // }

    previousChats(){
        this._chatService.previousChat(this.roomz)
        .subscribe((data)=>{
            this.chatHistory=JSON.parse(JSON.stringify(data))
            console.log(this.chatHistory)
          })
    }

}