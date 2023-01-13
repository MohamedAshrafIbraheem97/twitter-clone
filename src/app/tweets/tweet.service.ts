import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { User } from '../profile/models/User.model';
import { Tweet } from './models/tweet.model';
import { UserService } from '../profile/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class TweetService {
  tweetListChanged = new Subject<Tweet[]>();
  currentUser: User;
  user: User;
  tweets: Tweet[];

  constructor(private userService: UserService) {
    this.currentUser = this.userService.currentUser;
    this.user = this.userService.getUser('midooo')!;

    this.tweets = [
      {
        content: 'hello',
        creationDate: new Date(2022, 0, 10, 2, 1),
        creator: this.user,
        retweet: 0,
      },
      {
        content: 'hello',
        creationDate: new Date(2022, 0, 10, 2, 1),
        creator: this.user,
        retweet: 0,
      },
      {
        content: 'hello',
        creationDate: new Date(2022, 0, 10, 2, 1),
        creator: this.user,
        retweet: 0,
      },
      {
        content: 'hello',
        creationDate: new Date(2022, 0, 10, 2, 1),
        creator: this.user,
        retweet: 0,
      },
      {
        content: 'hello',
        creationDate: new Date(2022, 0, 10, 2, 1),
        creator: this.user,
        retweet: 0,
      },
      {
        content: 'hello',
        creationDate: new Date(2022, 0, 10, 2, 1),
        creator: this.user,
        retweet: 0,
      },
      {
        content: 'hello',
        creationDate: new Date(2022, 0, 10, 2, 1),
        creator: this.user,
        retweet: 0,
      },
      {
        content: 'hello',
        creationDate: new Date(2022, 0, 10, 2, 1),
        creator: this.user,
        retweet: 0,
      },
      {
        content: 'hello',
        creationDate: new Date(2022, 0, 10, 2, 1),
        creator: this.user,
        retweet: 0,
      },
      {
        content: 'hello',
        creationDate: new Date(2022, 0, 10, 2, 1),
        creator: this.user,
        retweet: 0,
      },
    ];
  }

  // user = this.userService.getUser('midooo')!;

  createTweet(tweet: Tweet) {
    this.tweets.unshift(tweet);
    this.tweetListChanged.next(this.tweets);
  }

  getTweets() {
    return this.tweets;
  }
}
