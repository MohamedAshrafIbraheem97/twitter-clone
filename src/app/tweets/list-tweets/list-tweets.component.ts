import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserProfile } from 'src/app/profile/models/User.model';
import { UserService } from 'src/app/profile/services/user.service';
import { TweetTypes } from 'src/app/shared/constants';
import { Tweet } from '../models/tweet.model';
import { TweetService } from '../tweet.service';

@Component({
  selector: 'app-list-tweets',
  templateUrl: './list-tweets.component.html',
  styleUrls: ['./list-tweets.component.sass'],
})
export class ListTweetsComponent implements OnInit, OnDestroy {
  @Input() wantedTweetsType: [TweetTypes, UserProfile];

  tweets: Tweet[] = [];
  subscription: Subscription;
  loggedInUser: UserProfile;
  isLoading: boolean = true;

  constructor(
    private _tweetService: TweetService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.loggedInUser = this._userService.loggedInUser;
    this._tweetService.isLoadingState.subscribe((state) => {
      this.isLoading = state;
    });

    this.tweets = this._tweetService.fetchTweetsByType(
      this.wantedTweetsType[0],
      this.wantedTweetsType[1]
    )!;

    this.subscription = this._tweetService.tweetListChanged.subscribe(
      (_tweets) => {
        this.tweets = _tweets;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
