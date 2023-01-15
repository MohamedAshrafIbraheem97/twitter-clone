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
  feedTweetsChanged = new Subject<Tweet[]>();
  currentUser: User;
  anonymousUser: User;
  feedTweets: Tweet[] = [];

  constructor(private userService: UserService) {
    this.currentUser = this.userService.currentUser;
    this.anonymousUser = this.userService.getUser('midooo')!;
    this.anonymousUser.tweets = [
      {
        content: 'hello',
        creationDate: new Date(2022, 0, 10, 2, 1),
        creator: this.anonymousUser,
        retweet: 0,
      },
      {
        content: 'hello',
        creationDate: new Date(2022, 0, 10, 2, 1),
        creator: this.anonymousUser,
        retweet: 0,
      },
      {
        content: 'hello',
        creationDate: new Date(2022, 0, 10, 2, 1),
        creator: this.anonymousUser,
        retweet: 0,
      },
      {
        content: 'hello',
        creationDate: new Date(2022, 0, 10, 2, 1),
        creator: this.anonymousUser,
        retweet: 0,
      },
      {
        content: 'hello',
        creationDate: new Date(2022, 0, 10, 2, 1),
        creator: this.anonymousUser,
        retweet: 0,
      },
      {
        content: 'hello',
        creationDate: new Date(2022, 0, 10, 2, 1),
        creator: this.anonymousUser,
        retweet: 0,
      },
      {
        content: 'hello',
        creationDate: new Date(2022, 0, 10, 2, 1),
        creator: this.anonymousUser,
        retweet: 0,
      },
      {
        content: 'hello',
        creationDate: new Date(2022, 0, 10, 2, 1),
        creator: this.anonymousUser,
        retweet: 0,
      },
      {
        content: 'hello',
        creationDate: new Date(2022, 0, 10, 2, 1),
        creator: this.anonymousUser,
        retweet: 0,
      },
      {
        content: 'hello',
        creationDate: new Date(2022, 0, 10, 2, 1),
        creator: this.anonymousUser,
        retweet: 0,
      },
    ];
  }

  createTweet(tweet: Tweet, creator: User) {
    // let tweetCreator = this.userService.getUser(creator.username);
    creator.tweets.unshift(tweet);
    this.feedTweets.unshift(tweet);
    this.feedTweetsChanged.next(this.feedTweets);
  }

  getTweets(): Tweet[] {
    return this.feedTweets;
  }

  getUserTweets(creator: User): Tweet[] {
    return creator.tweets;
  }

  getMyTweetsAndMyFollowingTweets(user: User): Tweet[] {
    let myTweetsAndMyFollowingTweets: Tweet[] = [];

    for (const followingUser of user.following) {
      myTweetsAndMyFollowingTweets = followingUser.tweets;
    }

    myTweetsAndMyFollowingTweets = myTweetsAndMyFollowingTweets.concat(
      user.tweets
    );

    myTweetsAndMyFollowingTweets.sort((firstDate: any, secondDate: any) => {
      return secondDate.creationDate - firstDate.creationDate;
    });
    this.feedTweets = myTweetsAndMyFollowingTweets;
    this.feedTweetsChanged.next(this.feedTweets);

    return myTweetsAndMyFollowingTweets;
  }
}
