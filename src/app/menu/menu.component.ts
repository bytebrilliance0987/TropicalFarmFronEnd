import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router, private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    this.userInformation();
  }

  date: Date = new Date();
  Today: string = formatDate(this.date, 'EEEE, d MMMM y ', 'en-US');

  user!: SocialUser;
  loggedIn!: boolean;

  userInformation(): void{
    const storage = localStorage.getItem('google_auth');
    if(storage){
      this.user = JSON.parse(storage);
      this.socialAuthService.authState.subscribe((user: any) => {
        this.user = user;
        if(user == null){
          user = '';
        }
      });
    }
  }

}
