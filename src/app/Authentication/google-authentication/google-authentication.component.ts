import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-google-authentication',
  templateUrl: './google-authentication.component.html',
  styleUrls: ['./google-authentication.component.css']
})
export class GoogleAuthenticationComponent implements OnInit {

  constructor(private router: Router, private socialAuthService: SocialAuthService, private securityService: SecurityService) { }

  ngOnInit(): void {
    this.securityService.userLogged(this.userlogged);
  }

  user!: SocialUser
  userlogged: boolean = false;

  signInHandler(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data => {
      localStorage.setItem('google_auth', JSON.stringify(data));
      this.socialAuthService.authState.subscribe((user: any) => {
        this.user = user;
        this.userlogged = true;
        this.securityService.userLogged(this.userlogged);
        this.router.navigateByUrl('/dashboard').then(() => {
          window.location.reload();
        });
      });
    })
  }

}
