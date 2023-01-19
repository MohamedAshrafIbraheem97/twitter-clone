import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from 'src/app/profile/models/User.model';
import { UserService } from 'src/app/profile/services/user.service';
import { Tweet } from '../models/tweet.model';
import { TweetService } from '../tweet.service';

import { TweetTypes } from './tweet/tweetTypes.enum';

@Component({
  selector: 'app-list-tweets',
  templateUrl: './list-tweets.component.html',
  styleUrls: ['./list-tweets.component.sass'],
})
export class ListTweetsComponent implements OnInit, OnDestroy {
  @Input() wantedTweetsType: [TweetTypes, User];

  tweets: Tweet[] | undefined;
  subscription: Subscription;
  loggedInUser: User;

  constructor(
    private tweetService: TweetService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loggedInUser = this.userService.currentUser;

    this.getTweetsBasedOnType();

    this.subscription = this.tweetService.tweetListChanged.subscribe(
      (_tweets) => {
        this.tweets = _tweets;
      }
    );
  }

  private getTweetsBasedOnType() {
    if (this.wantedTweetsType[0] === TweetTypes.mineAndMyFollowingTweets) {
      this.tweets = this.tweetService.getMyTweetsAndMyFollowingTweets(
        this.wantedTweetsType[1]
      );
    } else {
      this.tweets = this.tweetService.getUserTweets(
        this.wantedTweetsType[1].username
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
