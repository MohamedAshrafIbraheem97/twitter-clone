import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Tweet } from './tweets/models/tweet.model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  BASE_URL = 'https://ng-twitter-clone-6d5eb-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) {}

  getTweets(): Tweet[] {
    let loadedTweets: Tweet[] = [];

    this.http
      .get<Tweet[]>(`${this.BASE_URL}tweets.json`)
      .pipe(
        map((responseData) => {
          let tweets: Tweet[] = [];

          for (const key in responseData) {
            tweets.push({ ...responseData[key], _tweetId: key });
          }
          return tweets;
        })
      )
      .subscribe((responseData) => {
        loadedTweets = responseData;
        console.log(loadedTweets);
      });
    // console.log(loadedTweets);

    return loadedTweets;
  }

  createTweet(tweet: Tweet) {
    console.log(tweet);

    this.http
      .post(`${this.BASE_URL}tweets.json`, tweet)
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }
}
