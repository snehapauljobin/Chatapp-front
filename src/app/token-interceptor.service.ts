import { Injectable, Injector } from '@angular/core';
import { ChatService } from './chat.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(private injector: Injector) { }
  intercept(req:any,nxt:any)
  {
    let Chatservice=this.injector.get(ChatService)
    let tokenizedreq=req.clone(
      {
        setHeaders:{
          Authorization:`Bearer ${Chatservice.getToken()}`
        }
      }
    )
    return nxt.handle(tokenizedreq)
  }
}
