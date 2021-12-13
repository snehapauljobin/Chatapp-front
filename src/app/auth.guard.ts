import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ChatService } from './chat.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private chatservice:ChatService, private _router:Router){}
    canActivate():boolean{
      if(this.chatservice.loggedIn())
      {
        return true
      }
      else{this._router.navigate([''])
      return false
    }
      
  }} 
  