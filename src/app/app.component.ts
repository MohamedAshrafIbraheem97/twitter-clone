import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './profile/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'twitter-clone';
  isLoggedIn: boolean = false;
  userSubscription: Subscription;
  authTypeIsLogin: boolean;

  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this._userService.autoLogin();

    this.userSubscription = this._userService.loggedInUserChanged.subscribe(
      (loggedUser) => {
        if (loggedUser) {
          this.isLoggedIn = true;
          this.toggleElementVisibilityById('authPopup');
          // this.toggleElementVisibilityById('footer');
        } else {
          this.isLoggedIn = false;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe;
    // this.isLoggedIn = false;
  }

  toggleElementVisibilityById(elementId: string) {
    let element = document.getElementById(elementId);
    element?.classList.toggle('d-none');
  }

  showElementById(elementId: string) {
    let element;
    element = document.getElementById(elementId);
    element?.classList.remove('d-none');
  }

  authComponentType(authType: any) {
    this.authTypeIsLogin = authType;
    this.toggleElementVisibilityById('authPopup');
  }
}
