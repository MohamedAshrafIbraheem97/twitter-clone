import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../profile/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  isUserLoggedIn: boolean;
  userSubscribtion: Subscription;
  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this.userSubscribtion = this._userService.loggedInUserChanged.subscribe(
      (_loggedInUser) => {
        if (_loggedInUser) {
          this.isUserLoggedIn = true;
        } else {
          this.isUserLoggedIn = false;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.userSubscribtion.unsubscribe();
  }

  onLogout() {
    this._userService.logout();
  }
}
