import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor() { }

  protected userlogged!: boolean;
  
  public userLogged(userlogged: boolean): any{
    this.userlogged = userlogged;
  }

  isAuthenticated(): boolean{
    if(this.userlogged == false){
      return false
    }

    return true;
  }
}
