import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { User } from '../profile/models/User.model';
import { Tweet } from './models/tweet.model';
import { UserService } from '../profile/services/user.service';
import { DataStorageService } from '../data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TweetService {
  // tweetListChanged = new Subject<Tweet[]>();
  tweetListChanged = new Subject<Tweet[]>();
  currentUser: User;
  anonymousUser: User;
  tweets: Tweet[] = [];

  constructor(
    private userService: UserService,
    private dataStorageService: DataStorageService
  ) {
    this.currentUser = this.userService.currentUser;
    this.anonymousUser = this.userService.getUser('midooo')!;
    this.tweets = [
      {
        _tweetId: '1',
        content: 'hello',
        creationDate: new Date(2022, 0, 10, 2, 1),
        creator: this.anonymousUser.username,
        retweet: [],
      },
      {
        _tweetId: '2',
        content: 'hello',
        creationDate: new Date(2022, 0, 10, 2, 1),
        creator: this.anonymousUser.username,
        retweet: [],
      },
      {
        _tweetId: '3',
        content: 'hello',
        creationDate: new Date(2022, 0, 10, 2, 1),
        creator: this.anonymousUser.username,
        retweet: [],
      },
      {
        _tweetId: '4',
        content: 'hello',
        creationDate: new Date(2022, 0, 10, 2, 1),
        creator: this.anonymousUser.username,
        retweet: [],
      },
      {
        _tweetId: '5',
        content: 'hello',
        creationDate: new Date(2022, 0, 10, 2, 1),
        creator: this.anonymousUser.username,
        retweet: [],
      },
    ];
  }

  createTweet(tweet: Tweet, creator: User) {
    this.tweets.unshift(tweet);
    this.dataStorageService.createTweet(tweet);
    this.tweetListChanged.next(this.tweets);
  }

  getTweets(): Tweet[] {
    return this.tweets;
  }

  getUserTweets(creatorUsername: string): Tweet[] {
    return this.tweets.filter((tweet) => tweet.creator === creatorUsername);
  }

  getMyTweetsAndMyFollowingTweets(user: User): Tweet[] {
    let myTweetsAndMyFollowingTweets: Tweet[] = [];

    // console.log(this.dataStorageService.getTweets());
    // myTweetsAndMyFollowingTweets = this.dataStorageService.getTweets();

    // get my tweets and concat it to the empty list
    myTweetsAndMyFollowingTweets = myTweetsAndMyFollowingTweets.concat(
      this.getUserTweets(user.username)
    );

    // get my following tweets and concat it to the list
    myTweetsAndMyFollowingTweets = myTweetsAndMyFollowingTweets.concat(
      this.getFollowingTweets(user)
    );

    this.tweets = this.sortTweetsByDate(myTweetsAndMyFollowingTweets);

    this.tweetListChanged.next(this.tweets);

    return myTweetsAndMyFollowingTweets;
  }

  getFollowingTweets(user: User) {
    let followingTweets: Tweet[] = [];

    for (const followingUser of user.following) {
      followingTweets = followingTweets.concat(
        this.getUserTweets(followingUser)
      );
    }

    return followingTweets;
  }

  private sortTweetsByDate(tweets: Tweet[]) {
    tweets.sort((firstDate: any, secondDate: any) => {
      return secondDate.creationDate - firstDate.creationDate;
    });

    return tweets;
  }
}
