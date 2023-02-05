import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserProfile } from '../profile/models/User.model';
import { UserService } from '../profile/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass'],
})
export class NavComponent implements OnInit, OnDestroy {
  loggedInUser: UserProfile;
  userSubscription: Subscription;

  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this.userSubscription = this._userService.loggedInUserChanged.subscribe(
      (loggedInUser) => {
        this.loggedInUser = loggedInUser;
      }
    );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
