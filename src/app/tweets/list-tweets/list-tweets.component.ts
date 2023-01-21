import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/data-storage.service';

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

  tweets: Tweet[] = [];
  subscription: Subscription;
  loggedInUser: User;
  isLoading: boolean = true;

  constructor(
    private tweetService: TweetService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loggedInUser = this.userService.currentUser;
    this.tweetService.isLoadingState.subscribe((state) => {
      this.isLoading = state;
    });

    this.tweets = this.tweetService.fetchTweets(
      this.wantedTweetsType[0],
      this.wantedTweetsType[1]
    )!;

    this.subscription = this.tweetService.tweetListChanged.subscribe(
      (_tweets) => {
        this.tweets = _tweets;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
