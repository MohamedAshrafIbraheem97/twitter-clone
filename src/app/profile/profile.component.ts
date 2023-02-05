import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserProfile } from './models/User.model';
import { UserService } from './services/user.service';

import { TweetTypes } from 'src/app/shared/constants';
import { Subscription } from 'rxjs';
import { Constants } from '../shared/constants';

enum FOLLOW_STATES {
  follow = 'Follow',
  unfollow = 'Unfollow',
  following = 'Following',
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  anonymousUser: UserProfile;
  loggedInUser: UserProfile;
  userSubscription: Subscription;
  followBtnContent: FOLLOW_STATES;
  followStatesInTemplate = FOLLOW_STATES;
  tweetTypes = TweetTypes;

  constructor(
    private _userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userSubscription = this._userService.loggedInUserChanged.subscribe(
      (_loggedInUser) => {
        if (_loggedInUser) {
          this.loggedInUser = _loggedInUser;
        }
      }
    );

    this.activatedRoute.params.subscribe((params: Params) => {
      let user = this._userService.getUserByUsername(params['username']);
      if (user) {
        this.anonymousUser = user;
      } else {
        this.router.navigate(['**'], {});
      }
    });

    this.determineFollowBtnTextAndClasses();
    this.JoinDatePreview();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  determineFollowBtnTextAndClasses() {
    if (this.loggedInUser) {
      if (
        this._userService.findUserInFollowing(
          this.loggedInUser,
          this.anonymousUser
        ) !== -1
      ) {
        this.followBtnContent = FOLLOW_STATES.following;
      } else {
        this.followBtnContent = FOLLOW_STATES.follow;
      }
    } else {
      this.followBtnContent = FOLLOW_STATES.follow;
    }
  }

  followAndUnfollowUser() {
    if (
      this.followBtnContent === FOLLOW_STATES.unfollow ||
      this.followBtnContent === FOLLOW_STATES.following
    ) {
      this._userService.unFollowUser(this.loggedInUser, this.anonymousUser);
      this.followBtnContent = FOLLOW_STATES.follow;
    } else {
      this._userService.followUser(this.loggedInUser, this.anonymousUser);
      this.followBtnContent = FOLLOW_STATES.following;
    }
  }

  onMouseOver() {
    if (this.followBtnContent === FOLLOW_STATES.following) {
      this.followBtnContent = FOLLOW_STATES.unfollow;
    }
  }

  onMouseLeave() {
    if (this.followBtnContent === FOLLOW_STATES.unfollow) {
      this.followBtnContent = FOLLOW_STATES.following;
    }
  }

  JoinDatePreview(): string {
    let accountCreationDate = new Date(this.loggedInUser.accountCreation);

    return (
      Constants.MONTH_NAMES[accountCreationDate.getMonth()] +
      ' ' +
      accountCreationDate.getFullYear()
    );
  }
}
