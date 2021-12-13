import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';



@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http:HttpClient) { }

  // -----------------------------Sign Up------------------------
  newUser(item:any){
    console.log(item);
    // return this.http.post("/api/signup/insert", {"user":item})
    return this.http.post<any>("http://localhost:9600/signup/insert", {"user":item})
  }
  // -----------------------------Login------------------------

  loginUser(customer:any){
    // return this.http.post<any>('/api/login',customer)
     return this.http.post<any>("http://localhost:9600/login",customer)
  
 }

  // -----------------------------Login------------------------

  logOut(user:any){
      console.log(user)
    // return this.http.post<any>('/api/login',customer)
     return this.http.post<any>("http://localhost:9600/logout/chat",user)
     .subscribe((data)=>{
        
        console.log(data)
      })
  
 }
//------------------Indvuser details for personal chat-----------------
 getindvuser(id:any){
    // return this.http.get("/api/"+id);
     return this.http.get("http://localhost:9600/indvuser/"+id);
} 
// -----------------------------Userdetais to user dashboard------------------------
userprofile(item:any){
  // console.log(item);
  // return this.http.get("/api/authors/"+id);
    return this.http.get<any>("http://localhost:9600/userprofile/"+item);
} 

// -----------------------------Other User to user dashboard------------------------
otherusers(item:any){
  // console.log(item);
  // return this.http.get("/api/authors/"+id);
    return this.http.get<any>("http://localhost:9600/otherusers/"+item);
} 
blockContact(item:any){
    console.log(item)
    return this.http.post<any>("http://localhost:9600/blockcontact",item)
    .subscribe((data)=>{
        
        console.log(data)
        
      })    
}
unblockContact(item:any){
    console.log(item)
    return this.http.post<any>("http://localhost:9600/unblockContact",item)
    .subscribe((data)=>{
        
        console.log(data)
      }) 
}
contactsblocked(item:any){
    return this.http.get<any>("http://localhost:9600/contactsblocked/"+item);   
}
chatHistory(item:any){
    console.log(item)
    return this.http.get<any>("http://localhost:9600/chatHistory/"+item);
}
previousChat(itemz:any){
    console.log(itemz)
    return this.http.get<any>("http://localhost:9600/previous/previousChats/"+itemz);
}

// -----------------------------Logout------------------------
// logOut(details:any){
//     // return this.http.get("/api/authors/"+id);
//     console.log(details)
//       return this.http.put<any>("http://localhost:9600/logoutchats",details);
//   } 


 getToken(){
  return sessionStorage.getItem('token')
}
loggedIn()
{
  return!!sessionStorage.getItem('token')
}


private socket = io('http://localhost:9600',{ transports: ['websocket', 'polling', 'flashsocket'] });

// logguser(data:any):any{
//     console.log(data)
//     this.socket.emit('loguser',data)

// }
// loggoutuser(data:any):any{
//     console.log(data)
//     this.socket.disconnect()
// }
// personalChat(data:any):any{
//     console.log(data)
//     this.socket.emit('joinprivatechat',data);
// }


joinRoom(data:any):any
{
    this.socket.emit('join',data);
}


userloggedIn(){
    let observable = new Observable<{email:String,userID:String}>(observer=>{
        this.socket.on('user connected', (data:any)=>{
            observer.next(data);
        });
        return () => {this.socket.disconnect();}
    });

    return observable;


}
// needtoprivateChat()
// {
//     let observable = new Observable<{ room:String,from:String, message:String}>(observer=>{
//         this.socket.on('invite', (data:any)=>{
//             observer.next(data);
//         });
//         return () => {this.socket.disconnect();}
//     });

//     return observable;
// }

newUserJoined()
{
    let observable = new Observable<{user:String, message:String, userID:String}>(observer=>{
        this.socket.on('new user joined', (data:any)=>{
            observer.next(data);
        });
        return () => {this.socket.disconnect();}
    });

    return observable;
}

leaveRoom(data:any){
    this.socket.emit('leave',data);
}

userLeftRoom(){
    let observable = new Observable<{user:String, message:String, userID:String}>(observer=>{
        this.socket.on('left room', (data:any)=>{
            observer.next(data);
        });
        return () => {this.socket.disconnect();}
    });

    return observable;
}

sendMessage(data:any)
{
    this.socket.emit('message',data);
}

newMessageReceived(){
    let observable = new Observable<{user:String, message:String, userID:String}>(observer=>{
        this.socket.on('new message', (data:any)=>{
            observer.next(data);
        });
        return () => {this.socket.disconnect();}
    });

    return observable;
}
}
