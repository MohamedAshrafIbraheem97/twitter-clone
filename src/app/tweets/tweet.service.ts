import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Tweet } from './models/tweet.model';

@Injectable({
  providedIn: 'root',
})
export class TweetService {
  tweetListChanged = new Subject<Tweet[]>();
  private tweets: Tweet[] = [];

  createTweet(tweet: Tweet) {
    this.tweets.push(tweet);
    this.tweetListChanged.next(this.tweets);
  }

  getTweets() {
    return this.tweets;
  }
}
