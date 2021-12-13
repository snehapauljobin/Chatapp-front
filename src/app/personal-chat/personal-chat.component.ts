import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { concat } from 'rxjs-compat/operator/concat';
import { ChatService } from '../chat.service';
import { DetailsModel } from '../register/detailsmodel';
import io from 'socket.io-client';
import { BlockModel } from './blockmodel';


@Component({
  selector: 'app-personal-chat',
  templateUrl: './personal-chat.component.html',
  styleUrls: ['./personal-chat.component.css']
})
export class PersonalChatComponent implements OnInit {

  constructor(private chatservice:ChatService,private router:Router) { }
isAvailable:any=false;
  imageUrl:any=undefined;
  // selectedFile:File=null;
  imagefile:any;
  image:string='';
  muteuser:any=[]; 
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


  users!:DetailsModel[];

  userItem={
    name:'',
    email:'', 
  }
  loginItem={
    name:'',
    email:'', 
  }
  BlockedArray={
    fromemail:'',
    toemail:'', 
  }
  BlockArray={
    from:'',
    to:''
  }

  // BlockItem= new BlockModel(null,null)
  chatHistory:Array<{user:String,message:String,room:String,created:String,imgfile:String}> = [];
  messageArray:Array<{user:String,message:String,room:String,image:String}> = [];
  // BlockArray:Array<{from:String,to:String}> = [];
  imageArray:Array<{user:String,image:String}> = [];
  messageText:String | undefined;
 room=String;
 
  private socket = io('http://localhost:9600',{ transports: ['websocket', 'polling', 'flashsocket'] });
    ngOnInit(): void {
      console.log(this.BlockArray)
      // if(this.BlockArray.==this.loginItem.email){

      // }
      // console.log(this.messageArray)
      let indvuserId=sessionStorage.getItem("indvuserId")
      this.chatservice.getindvuser(indvuserId)
      .subscribe((data)=>{
        this.userItem=JSON.parse(JSON.stringify(data))
        console.log(this.userItem)
      })
      let loginmail=sessionStorage.getItem("loginmail");
      console.log(loginmail);
      
      this.chatservice.userprofile(loginmail)
      .subscribe((data)=>{
        this.loginItem=JSON.parse(JSON.stringify(data))
        console.log(this.loginItem)
      })



//----------------------Block a contact---------------------------

     let recevmail=sessionStorage.getItem ("recevmail")
this.chatservice.contactsblocked(loginmail)
.subscribe((data)=>{
  this.BlockArray=JSON.parse(JSON.stringify(data))
  console.log(this.BlockArray)
  let join= document.getElementById('join');
  let block= document.getElementById('block');
  let send= document.getElementById('send');
  let unblock= document.getElementById('unblock');
  let mute= document.getElementById('mute');
let unmute= document.getElementById('unmute');
if(this.BlockArray){
  if((this.BlockArray.to!==recevmail && this.BlockArray.from!==loginmail)){
  alert("You can no longer chat with this person as it is blocked")
  join.style.display = 'none';
  block.style.display = 'none';
  send.style.display = 'none';
  mute.style.display = 'none';
  // unblock.style.display = '';
  unmute.style.display = 'none';
  }
  else{
    join.style.display = '';
  block.style.display = '';
  send.style.display = '';
  unblock.style.display = 'none';
  if(this.muteuser.includes(recevmail)){
    mute.style.display = 'none';
    unmute.style.display = '';
  }
  else{
    mute.style.display = '';
    unmute.style.display = 'none';
  } 
  }
  }
  if(!this.BlockArray){
    join.style.display = '';
  block.style.display = '';
  send.style.display = '';
    unblock.style.display = 'none';
    if(this.muteuser.includes(recevmail)){
      mute.style.display = 'none';
      unmute.style.display = '';
    }
    else{
      mute.style.display = '';
      unmute.style.display = 'none';
    } 
  }
})

      this.socket.on('frwdImg',(message:any)=>{
        
          this.messageArray.push(message)
          sessionStorage.removeItem("forwardimg")
        

return()=>{this.socket.disconnect();}
      })
      this.socket.on('frwdtxt',(message:any)=>{
        this.messageArray.push(message)
        sessionStorage.removeItem("forwardtxt")
        return()=>{this.socket.disconnect();}
              })



      this.socket.on('invite_to', (message:any)=>{

        if(!this.BlockArray){ 
          if(!(this.muteuser.includes(recevmail)) ){
            this.playAudio();
          }
          console.log(message)
      
      // this.messageArray.push(message);
    }
   else if((this.BlockArray.to!==recevmail && this.BlockArray.from!==loginmail) || (this.BlockArray.to=='' && this.BlockArray.from=='')){
    if(!(this.muteuser.includes(recevmail)) ){
      this.playAudio();
    }
    this.messageArray.push(message);
    }
     return()=>{this.socket.disconnect();}
    
    })

    this.socket.on('new_image', (message:any)=>{

      if(!this.BlockArray){
        if(message.user!=loginmail){
          if(!(this.muteuser.includes(recevmail)) ){
            this.playAudio();
          }
        } 
        this.messageArray.push(message);
      }
      else if(this.BlockArray.to!==recevmail && this.BlockArray.from!==loginmail){
        if(message.user!=loginmail){
          if(!(this.muteuser.includes(recevmail)) ){
            this.playAudio();
          }
        } 
        this.messageArray.push(message);
      }
     return()=>{this.socket.disconnect();}
    
    })
    this.socket.on('new_indvmessage', (message:any)=>{
      // this.chatservice.needtoprivateChat()
      if(!this.BlockArray){
        if(message.user!=loginmail){
          if(!(this.muteuser.includes(recevmail)) ){
            this.playAudio();
          }
        } 
        this.messageArray.push(message);
        // let chat=document.getElementById("chat")
        // if(message.user==loginmail){
        // chat.style.float='left'
        // }
        // else if(message.user!=loginmail){
        //   chat.style.float='right'
        // }

        console.log(this.muteuser)
      }
       else if(this.BlockArray.to!==recevmail && this.BlockArray.from!==loginmail){
        if(message.user!=loginmail){
          if(!(this.muteuser.includes(recevmail)) ){
            this.playAudio();
          }
        } 
         this.messageArray.push(message);
        //  let chat=document.getElementById("chat")
        //  if(message.user==loginmail){
        //  chat.style.float='left'
        //  }
        //  else if(message.user!=loginmail){
        //    chat.style.float='right'
        //  }
       }
         console.log(this.messageArray)
      return()=>{this.socket.disconnect();}
     
     })
  }
 

  blockContact(){ 
    
    let loginmail=sessionStorage.getItem("loginmail");
    this.BlockedArray.fromemail=loginmail
    this.BlockedArray.toemail=this.userItem.email
    console.log(this.BlockedArray)
    this.chatservice.blockContact(this.BlockedArray)
  //   .subscribe((data)=>{
  //     this.userItem=JSON.parse(JSON.stringify(data))
  //     console.log(this.BlockedArray)
  // })
  let recevmail=sessionStorage.getItem ("recevmail")
  this.chatservice.contactsblocked(loginmail)
.subscribe((data)=>{
this.BlockArray=JSON.parse(JSON.stringify(data))
//console.log(this.BlockArray)
let join= document.getElementById('join');
let block= document.getElementById('block');
let send= document.getElementById('send');
let unblock= document.getElementById('unblock');
let mute= document.getElementById('mute');
let unmute= document.getElementById('unmute');
console.log(this.BlockArray)
if(this.BlockArray.to==recevmail && this.BlockArray.from==loginmail){
alert("You can no longer chat with this person as it is blocked")
join.style.display = 'none';
block.style.display = 'none';
send.style.display = 'none';
unblock.style.display = '';
  mute.style.display = 'none';
  unmute.style.display = 'none';
}
})
  }


//   blockContact(){
//     let recevmail=sessionStorage.getItem ("recevmail")
//     let loginmail=sessionStorage.getItem ("usermail")
//     this.BlockedArray.fromemail=this.loginItem.email
//     this.BlockedArray.toemail=this.userItem.email
//     console.log(this.BlockedArray)
//     this.chatservice.blockContact(this.BlockedArray)
//     let join= document.getElementById('join');
// let block= document.getElementById('block');
// let send= document.getElementById('send');
// let unblock= document.getElementById('unblock');
// let mute= document.getElementById('mute');
// let unmute= document.getElementById('unmute');
// console.log(this.BlockArray)
// if(this.BlockArray.to==recevmail && this.BlockArray.from==loginmail){
// alert("You can no longer chat with this person as it is blocked")
// join.style.display = 'none';
// block.style.display = 'none';
// send.style.display = 'none';
// unblock.style.display = '';
//   mute.style.display = 'none';
//   unmute.style.display = 'none';
// }
//   //   .subscribe((data)=>{
//   //     this.userItem=JSON.parse(JSON.stringify(data))
//   //     console.log(this.BlockedArray)
//   // })
// }


unblockContact(){
  let recevmail=sessionStorage.getItem ("recevmail")
  let loginmail=sessionStorage.getItem("loginmail");
  this.BlockedArray.fromemail=loginmail
  this.BlockedArray.toemail=this.userItem.email
  //console.log(this.BlockedArray)
  this.chatservice.unblockContact(this.BlockedArray)
  this.chatservice.contactsblocked(loginmail)
  .subscribe((data)=>{
  this.BlockArray=JSON.parse(JSON.stringify(data))
})
console.log(this.BlockArray)
  let join= document.getElementById('join');
  let block= document.getElementById('block');
  let send= document.getElementById('send');
  let unblock= document.getElementById('unblock');
  let mute= document.getElementById('mute');
let unmute= document.getElementById('unmute');
  join.style.display = '';
block.style.display = '';
send.style.display = '';
  unblock.style.display = 'none';
  if(this.muteuser.includes(recevmail)){
    mute.style.display = 'none';
    unmute.style.display = '';
  }
  else{
    mute.style.display = '';
    unmute.style.display = 'none';
  } 
}
// unblockContact(){
//   let recevmail=sessionStorage.getItem ("recevmail")
//   this.BlockedArray.fromemail=this.loginItem.email
//   this.BlockedArray.toemail=this.userItem.email
//   console.log(this.BlockedArray)
//   this.chatservice.unblockContact(this.BlockedArray)
//   let join= document.getElementById('join');
//   let block= document.getElementById('block');
//   let send= document.getElementById('send');
//   let unblock= document.getElementById('unblock');
//   let mute= document.getElementById('mute');
// let unmute= document.getElementById('unmute');
//   join.style.display = '';
// block.style.display = '';
// send.style.display = '';
//   unblock.style.display = 'none';
//   if(this.muteuser.includes(recevmail)){
//     mute.style.display = 'none';
//     unmute.style.display = '';
//   }
//   else{
//     mute.style.display = '';
//     unmute.style.display = 'none';
//   } 
// }
    createRoom(){
      let indvuserId=sessionStorage.getItem("indvuserId")
      let loginmail=sessionStorage.getItem("loginmail");
      let forwardimg=sessionStorage.getItem("forwardimg");
      let forwardtxt=sessionStorage.getItem("forwardtxt");
      let mute= document.getElementById('mute');
let unmute= document.getElementById('unmute');
      function createRoomName(id1:any, id2:any) {
        // make sure id1 is the smaller value for
        // consistency of generation
        if (id1 > id2) {
            // swap two values
            let temp = id2;
            id2 = id1;
            id1 = temp;
        }
        return id1.toString(10).padStart(10, "0") + id2.toString(10).padStart(10, "0");
    }
    
    let room=(createRoomName(this.userItem.email, this.loginItem.email));
    console.log(room)

this.socket.emit('joinprivatechat',{loginmail:loginmail,recepient:indvuserId,room:room});
this.socket.emit('forwardimage',{loginmail:loginmail,recepient:indvuserId,room:room,img:forwardimg});
this.socket.emit('forwardtext',{loginmail:loginmail,recepient:indvuserId,room:room,text:forwardtxt});
// this.chatservice.personalChat({loginmail:loginmail,recepient:indvuserId,room:room})
    }

    sendMessage(){
      let indvuserId=sessionStorage.getItem("indvuserId")
      let loginmail=sessionStorage.getItem("loginmail");
      function createRoomN(id1:any, id2:any) {
        // make sure id1 is the smaller value for
        // consistency of generation
        if (id1 > id2) {
            // swap two values
            let temp = id2;
            id2 = id1;
            id1 = temp;
        }
        return id1.toString(10).padStart(10, "0") + id2.toString(10).padStart(10, "0");
    }
    
    let room=(createRoomN(this.userItem.email, this.loginItem.email));
    console.log(room)
      this.socket.emit('sendindvmsg',{user:loginmail,  message:this.messageText,recepient:indvuserId,room:room})
    }
    
sendImage(){
  let indvuserId=sessionStorage.getItem("indvuserId")
  let loginmail=sessionStorage.getItem("loginmail");
  function createRoom(id1:any, id2:any) {
    // make sure id1 is the smaller value for
    // consistency of generation
    if (id1 > id2) {
        // swap two values
        let temp = id2;
        id2 = id1;
        id1 = temp;
    }
    return id1.toString(10).padStart(10, "0") + id2.toString(10).padStart(10, "0");
}

let room=(createRoom(this.userItem.email, this.loginItem.email));
console.log(room)
console.log(this.imageUrl)
  this.socket.emit('sendimage',{user:loginmail,  image:this.imageUrl,recepient:indvuserId,room:room})
}
forwardImg(item:any){
  console.log(item)
  sessionStorage.setItem("forwardimg",item.image.toString())
  this.router.navigate(['forward']);

}
forwardMsg(item:any){
  console.log(item)
  sessionStorage.setItem("forwardtxt",item.message.toString())
  this.router.navigate(['forward']);

}

    //----------------------Chat history---------------------------
    viewChatHis(){
      function createRoom(id1:any, id2:any) {
        // make sure id1 is the smaller value for
        // consistency of generation
        if (id1 > id2) {
            // swap two values
            let temp = id2;
            id2 = id1;
            id1 = temp;
        }
        return id1.toString(10).padStart(10, "0") + id2.toString(10).padStart(10, "0");
    }
    console.log(this.userItem.email)
    let room=(createRoom(this.userItem.email, this.loginItem.email));
    console.log(room)


    this.chatservice.chatHistory(room)
    .subscribe((data)=>{
      this.chatHistory=JSON.parse(JSON.stringify(data))
      console.log(this.chatHistory)
    })
    }
    getMute(user:any){
      let recevmail=sessionStorage.getItem ("recevmail")
      let loginmail=sessionStorage.getItem("email");
      this.muteuser.push(recevmail)
      if(!(this.muteuser.includes(loginmail))){
        this.muteuser.push(loginmail)
        }
      console.log(this.muteuser)
      let join= document.getElementById('join');
  let block= document.getElementById('block');
  let send= document.getElementById('send');
  let unblock= document.getElementById('unblock');
  let mute= document.getElementById('mute');
let unmute= document.getElementById('unmute');
  join.style.display = '';
block.style.display = '';
send.style.display = '';
  unblock.style.display = 'none';
    mute.style.display = 'none';
    unmute.style.display = '';
      }
      getUnmute(user:any){       
  let recevmail=sessionStorage.getItem ("recevmail")
        const index = this.muteuser.indexOf(recevmail);
if (index > -1) {
  this.muteuser.splice(index, 1);
  console.log(this.muteuser)
  let join= document.getElementById('join');
  let block= document.getElementById('block');
  let send= document.getElementById('send');
  let unblock= document.getElementById('unblock');
  let mute= document.getElementById('mute');
let unmute= document.getElementById('unmute');
  join.style.display = '';
block.style.display = '';
send.style.display = '';
  unblock.style.display = 'none';
    mute.style.display = '';
    unmute.style.display = 'none';
   
}   
        }
        playAudio(){
          let audio = new Audio();
          audio.src = "../../../assets/audio/Message notification.mp3";
          audio.load();
          audio.play();
        }
    }


//-----------------------------------------------------------------------------


// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { concat } from 'rxjs-compat/operator/concat';
// import { ChatService } from '../chat.service';
// import { DetailsModel } from '../register/detailsmodel';
// import io from 'socket.io-client';
// import { BlockModel } from './blockmodel';


// @Component({
//   selector: 'app-personal-chat',
//   templateUrl: './personal-chat.component.html',
//   styleUrls: ['./personal-chat.component.css']
// })
// export class PersonalChatComponent implements OnInit {

//   constructor(private chatservice:ChatService,private router:Router) { }
// isAvailable:any=false;
//   imageUrl:any=undefined;
//   // selectedFile:File=null;
//   imagefile:any;
//   image:string='';
 
//   onFileSelected(event:any){
//   if(event.target.files){

//     var reader=new FileReader();
//     reader.readAsDataURL(event.target.files[0]);
//     reader.onload=(event:any)=>{
//     this.imageUrl=reader.result;
    
//     }
// this.imagefile=<File>event.target.files[0];
//     }
  

//  this.image=this.imagefile.name;

 
//     }


//   users!:DetailsModel[];

//   userItem={
//     name:'',
//     email:'', 
//   }
//   loginItem={
//     name:'',
//     email:'', 
//   }
//   BlockedArray={
//     fromemail:'',
//     toemail:'', 
//   }
//   BlockArray={
//     from:'',
//     to:''
//   }

//   // BlockItem= new BlockModel(null,null)
//   chatHistory:Array<{user:String,message:String,room:String,created:String,imgfile:String}> = [];
//   messageArray:Array<{user:String,message:String,room:String,image:String}> = [];
//   // BlockArray:Array<{from:String,to:String}> = [];
//   imageArray:Array<{user:String,image:String}> = [];
//   messageText:String | undefined;
//  room=String;
 
//   private socket = io('http://localhost:9600',{ transports: ['websocket', 'polling', 'flashsocket'] });
//     ngOnInit(): void {
//       console.log(this.BlockArray)
//       // if(this.BlockArray.==this.loginItem.email){

//       // }
//       // console.log(this.messageArray)
//       let indvuserId=sessionStorage.getItem("indvuserId")
//       this.chatservice.getindvuser(indvuserId)
//       .subscribe((data)=>{
//         this.userItem=JSON.parse(JSON.stringify(data))
//         console.log(this.userItem)
//       })
//       let loginmail=sessionStorage.getItem("loginmail");
//       console.log(loginmail);
      
//       this.chatservice.userprofile(loginmail)
//       .subscribe((data)=>{
//         this.loginItem=JSON.parse(JSON.stringify(data))
//         console.log(this.loginItem)
//       })



// //----------------------Block a contact---------------------------

//      let recevmail=sessionStorage.getItem ("recevmail")
// this.chatservice.contactsblocked(loginmail)
// .subscribe((data)=>{
//   this.BlockArray=JSON.parse(JSON.stringify(data))
//   console.log(this.BlockArray)
//   let join= document.getElementById('join');
//   let block= document.getElementById('block');
//   let send= document.getElementById('send');
//   let unblock= document.getElementById('unblock');
//   if(this.BlockArray.to==recevmail && this.BlockArray.from==loginmail){
//     alert("You can no longer chat with this person as it is blocked")
//     join.style.display = 'none';
//     block.style.display = 'none';
//     send.style.display = 'none';
//     unblock.style.display = 'block';
    
//   }
// })

//       this.socket.on('frwdImg',(message:any)=>{
// this.messageArray.push(message)
// sessionStorage.removeItem("forwardimg")
// return()=>{this.socket.disconnect();}
//       })
//       this.socket.on('frwdtxt',(message:any)=>{
//         this.messageArray.push(message)
//         sessionStorage.removeItem("forwardtxt")
//         return()=>{this.socket.disconnect();}
//               })



//       this.socket.on('invite_to', (message:any)=>{

//       this.messageArray.push(message);
//      return()=>{this.socket.disconnect();}
    
//     })

//     this.socket.on('new_image', (message:any)=>{

//       this.messageArray.push(message);
//      return()=>{this.socket.disconnect();}
    
//     })
//     this.socket.on('new_indvmessage', (message:any)=>{
//       // this.chatservice.needtoprivateChat()
//       console.log(message)
//        this.messageArray.push(message);
//        console.log(this.messageArray)
//       return()=>{this.socket.disconnect();}
     
//      })
//   }
 
//   blockContact(){
   
//     this.BlockedArray.fromemail=this.loginItem.email
//     this.BlockedArray.toemail=this.userItem.email
//     console.log(this.BlockedArray)
//     this.chatservice.blockContact(this.BlockedArray)
//   //   .subscribe((data)=>{
//   //     this.userItem=JSON.parse(JSON.stringify(data))
//   //     console.log(this.BlockedArray)
//   // })
// }


// unblockContact(){
//   this.BlockedArray.fromemail=this.loginItem.email
//   this.BlockedArray.toemail=this.userItem.email
//   console.log(this.BlockedArray)
//   this.chatservice.unblockContact(this.BlockedArray)

// }
//     createRoom(){
//       let indvuserId=sessionStorage.getItem("indvuserId")
//       let loginmail=sessionStorage.getItem("loginmail");
//       let forwardimg=sessionStorage.getItem("forwardimg");
//       let forwardtxt=sessionStorage.getItem("forwardtxt");
//       function createRoomName(id1:any, id2:any) {
//         // make sure id1 is the smaller value for
//         // consistency of generation
//         if (id1 > id2) {
//             // swap two values
//             let temp = id2;
//             id2 = id1;
//             id1 = temp;
//         }
//         return id1.toString(10).padStart(10, "0") + id2.toString(10).padStart(10, "0");
//     }
    
//     let room=(createRoomName(this.userItem.email, this.loginItem.email));
//     console.log(room)

// this.socket.emit('joinprivatechat',{loginmail:loginmail,recepient:indvuserId,room:room});
// this.socket.emit('forwardimage',{loginmail:loginmail,recepient:indvuserId,room:room,img:forwardimg});
// this.socket.emit('forwardtext',{loginmail:loginmail,recepient:indvuserId,room:room,text:forwardtxt});
// // this.chatservice.personalChat({loginmail:loginmail,recepient:indvuserId,room:room})
//     }

//     sendMessage(){
//       let indvuserId=sessionStorage.getItem("indvuserId")
//       let loginmail=sessionStorage.getItem("loginmail");
//       function createRoomN(id1:any, id2:any) {
//         // make sure id1 is the smaller value for
//         // consistency of generation
//         if (id1 > id2) {
//             // swap two values
//             let temp = id2;
//             id2 = id1;
//             id1 = temp;
//         }
//         return id1.toString(10).padStart(10, "0") + id2.toString(10).padStart(10, "0");
//     }
    
//     let room=(createRoomN(this.userItem.email, this.loginItem.email));
//     console.log(room)
//       this.socket.emit('sendindvmsg',{user:loginmail,  message:this.messageText,recepient:indvuserId,room:room})
//     }
    
// sendImage(){
//   let indvuserId=sessionStorage.getItem("indvuserId")
//   let loginmail=sessionStorage.getItem("loginmail");
//   function createRoom(id1:any, id2:any) {
//     // make sure id1 is the smaller value for
//     // consistency of generation
//     if (id1 > id2) {
//         // swap two values
//         let temp = id2;
//         id2 = id1;
//         id1 = temp;
//     }
//     return id1.toString(10).padStart(10, "0") + id2.toString(10).padStart(10, "0");
// }

// let room=(createRoom(this.userItem.email, this.loginItem.email));
// console.log(room)
// console.log(this.imageUrl)
//   this.socket.emit('sendimage',{user:loginmail,  image:this.imageUrl,recepient:indvuserId,room:room})
// }
// forwardImg(item:any){
//   console.log(item)
//   sessionStorage.setItem("forwardimg",item.image.toString())
//   this.router.navigate(['forward']);

// }
// forwardMsg(item:any){
//   console.log(item)
//   sessionStorage.setItem("forwardtxt",item.message.toString())
//   this.router.navigate(['forward']);

// }

//     //----------------------Chat history---------------------------
//     viewChatHis(){
//       function createRoom(id1:any, id2:any) {
//         // make sure id1 is the smaller value for
//         // consistency of generation
//         if (id1 > id2) {
//             // swap two values
//             let temp = id2;
//             id2 = id1;
//             id1 = temp;
//         }
//         return id1.toString(10).padStart(10, "0") + id2.toString(10).padStart(10, "0");
//     }
//     console.log(this.userItem.email)
//     let room=(createRoom(this.userItem.email, this.loginItem.email));
//     console.log(room)


//     this.chatservice.chatHistory(room)
//     .subscribe((data)=>{
//       this.chatHistory=JSON.parse(JSON.stringify(data))
//       console.log(this.chatHistory)
//     })
//     }
//     }

