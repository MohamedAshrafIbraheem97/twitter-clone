import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Tweet } from './tweets/models/tweet.model';
import { TweetService } from './tweets/tweet.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  BASE_URL = 'https://ng-twitter-clone-6d5eb-default-rtdb.firebaseio.com/';

  loadedTweetsChanged = new Subject<Tweet[]>();
  loadedTweets: Tweet[] = [];
  constructor(
    private _httpClient: HttpClient,
    private _tweetService: TweetService
  ) {}

  // getTweets() {
  //   this._httpClient
  //     .get<Tweet[]>(`${this.BASE_URL}tweets.json`)
  //     .pipe(
  //       map((responseData) => {
  //         let tweets: Tweet[] = [];

  //         for (const key in responseData) {
  //           tweets.push({
  //             ...responseData[key],
  //             _tweetId: key,
  //             creationDate: new Date(responseData[key].creationDate),
  //             retweet: responseData[key].retweet
  //               ? responseData[key].retweet
  //               : [],
  //           });
  //         }

  //         return tweets;
  //       })
  //     )
  //     .subscribe((responseData) => {
  //       // this._tweetService.setTweets(responseData);
  //       this._tweetService.allTweets = responseData;
  //     });
  // }

  // createTweet(tweet: Tweet) {
  //   this._httpClient
  //     .post(`${this.BASE_URL}tweets.json`, tweet)
  //     .subscribe((responseData) => {
  //       this._tweetService.createTweet(tweet);
  //       console.log(responseData);
  //     });
  // }
}
