import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  //isAuthenticated = false;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
  }

  ngOnInit() {
    this.checkAuthentication();
    this.monitorToken();
  }

  checkAuthentication() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      //this.isAuthenticated = !!token;
    }
  }

  isAuthenticated(): boolean {
    var str = localStorage.getItem('token');
    console.log(str)
    if (str == null) {
      return false;
    }
    return true;
  }


  onLoginSuccess() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', 'meuTokenDeAcesso');
    }
    //this.isAuthenticated = true;
  }

  monitorToken() {
    if (isPlatformBrowser(this.platformId)) {
      setInterval(() => {
        if (!localStorage.getItem('token')) {
          // this.isAuthenticated = false;
        }
      }, 1000);
    }
  }
}
