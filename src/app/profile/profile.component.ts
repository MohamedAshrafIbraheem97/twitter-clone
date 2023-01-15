import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { User } from './models/User.model';
import { UserService } from './services/user.service';

import { TweetTypes } from '../tweets/list-tweets/tweet/tweetTypes.enum';

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
export class ProfileComponent implements OnInit {
  anonymousUser: User;
  loggedInUser: User;
  followBtnContent: FOLLOW_STATES;
  followStatesInTemplate = FOLLOW_STATES;
  tweetTypes = TweetTypes;

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loggedInUser = this.userService.currentUser;

    this.activatedRoute.params.subscribe((params: Params) => {
      let user = this.userService.getUser(params['username']);
      if (user) {
        this.anonymousUser = user;
      } else {
        this.router.navigate([`/${params['username']}`], {
          relativeTo: this.activatedRoute,
        });
      }
    });

    this.determineFollowBtnTextAndClasses();
  }

  determineFollowBtnTextAndClasses() {
    if (
      this.userService.findUserInFollowing(
        this.loggedInUser,
        this.anonymousUser
      ) !== -1
    ) {
      this.followBtnContent = FOLLOW_STATES.following;
    } else {
      this.followBtnContent = FOLLOW_STATES.follow;
    }
  }

  followAndUnfollowUser() {
    if (
      this.followBtnContent === FOLLOW_STATES.unfollow ||
      this.followBtnContent === FOLLOW_STATES.following
    ) {
      this.userService.unFollowUser(this.loggedInUser, this.anonymousUser);
      this.followBtnContent = FOLLOW_STATES.follow;
    } else {
      this.userService.followUser(this.loggedInUser, this.anonymousUser);
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
}
