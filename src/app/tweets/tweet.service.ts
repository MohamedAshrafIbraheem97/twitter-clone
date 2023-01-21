import { Injectable, OnInit } from '@angular/core';
import { map, Subject, tap } from 'rxjs';

import { User } from '../profile/models/User.model';
import { Tweet } from './models/tweet.model';
import { UserService } from '../profile/services/user.service';
import {
  HttpClient,
  HttpEventType,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { TweetTypes } from './list-tweets/tweet/tweetTypes.enum';

@Injectable({
  providedIn: 'root',
})
export class TweetService {
  tweetListChanged = new Subject<Tweet[]>();
  isLoadingState = new Subject<boolean>();
  loadingState: boolean = false;
  currentUser: User;
  anonymousUser: User;
  allTweets: Tweet[] = [];
  currentTweets: Tweet[] = [];
  BASE_URL = 'https://ng-twitter-clone-6d5eb-default-rtdb.firebaseio.com/';
  uploadProgress = new Subject<number>();

  constructor(
    private userService: UserService,
    private _httpClient: HttpClient
  ) {
    this.currentUser = this.userService.currentUser;
    this.anonymousUser = this.userService.getUser('midooo')!;
    // this.tweets = this.tweets.concat([
    //   {
    //     _tweetId: '1',
    //     content: 'hello',
    //     creationDate: new Date(2022, 0, 10, 2, 1),
    //     creator: this.anonymousUser.username,
    //     retweet: [],
    //   },
    //   {
    //     _tweetId: '2',
    //     content: 'hello',
    //     creationDate: new Date(2022, 0, 10, 2, 1),
    //     creator: this.anonymousUser.username,
    //     retweet: [],
    //   },
    //   {
    //     _tweetId: '3',
    //     content: 'hello',
    //     creationDate: new Date(2022, 0, 10, 2, 1),
    //     creator: this.anonymousUser.username,
    //     retweet: [],
    //   },
    //   {
    //     _tweetId: '4',
    //     content: 'hello',
    //     creationDate: new Date(2022, 0, 10, 2, 1),
    //     creator: this.anonymousUser.username,
    //     retweet: [],
    //   },
    //   {
    //     _tweetId: '5',
    //     content: 'hello',
    //     creationDate: new Date(2022, 0, 10, 2, 1),
    //     creator: this.anonymousUser.username,
    //     retweet: [],
    //   },
    // ]);
  }

  getTweets(tweetsType: TweetTypes, user: User): Tweet[] {
    this._httpClient
      .get<Tweet[]>(`${this.BASE_URL}tweets.json`)
      .pipe(
        map((responseData) => {
          this.loadingState = true;
          this.isLoadingState.next(this.loadingState);

          let tweets: Tweet[] = [];

          for (const key in responseData) {
            tweets.push({
              ...responseData[key],
              _tweetId: key,
              creationDate: new Date(responseData[key].creationDate),
              retweet: responseData[key].retweet
                ? responseData[key].retweet
                : [],
            });
          }

          return tweets;
        })
      )
      .subscribe({
        // this.allTweets = tweets;
        next: (tweets: Tweet[]) => {
          this.allTweets = this.getTweetsBasedOnType(tweetsType, tweets, user);
          this.tweetListChanged.next(this.allTweets);
        },
        complete: () => {
          this.loadingState = false;
          this.isLoadingState.next(this.loadingState);
        },
      });

    return this.allTweets;
  }

  createTweet(tweet: Tweet, creator: User) {
    let req2 = this._httpClient
      .post(`${this.BASE_URL}tweets.json`, tweet, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          let percentDone = Math.round((100 * event.loaded) / event.total!);
          this.uploadProgress.next(percentDone);
        } else if (event.type === HttpEventType.Response) {
          this.allTweets.unshift(tweet);
          this.tweetListChanged.next(this.allTweets);
          this.uploadProgress.next(0);
        }
      });

    // console.log(req2);

    // const req = new HttpRequest('POST', `${this.BASE_URL}tweets.json`, tweet, {
    //   reportProgress: true,
    // });

    // console.log(req);

    // this._httpClient.request(req).subscribe((event) => {
    //   // Via this API, you get access to the raw event stream.
    //   // Look for upload progress events.
    //   if (event.type === HttpEventType.UploadProgress) {
    //     // This is an upload progress event. Compute and show the % done:

    //     const percentDone = Math.round((100 * event.loaded) / event.total!);
    //     // console.log(`File is ${percentDone}% uploaded.`);
    //   } else if (event instanceof HttpResponse) {
    //     // console.log('tweet is completely uploaded!');
    //     this.allTweets.unshift(tweet);
    //     this.tweetListChanged.next(this.allTweets);
    //   }
    // });
  }

  getTweetsBasedOnType(
    wantedTweetType: any,
    tweetsList: Tweet[],
    user: User
  ): Tweet[] {
    let tweets: Tweet[] = [];
    if (wantedTweetType === TweetTypes.mineAndMyFollowingTweets) {
      tweets = this.getMyTweetsAndMyFollowingTweets(tweetsList, user);
    } else {
      tweets = this.getUserTweets(tweetsList, user.username);
    }

    return tweets;
  }

  getUserTweets(tweetList: Tweet[], creatorUsername: string): Tweet[] {
    let tweets: Tweet[] = [];

    if (tweetList.length > 0) {
      tweets = tweetList.filter(
        (tweet: Tweet) => tweet.creator === creatorUsername
      );
    }

    tweets = this.sortTweetsByDate(tweets);

    return tweets;
  }

  getFollowingTweets(tweetList: Tweet[], user: User): Tweet[] {
    let followingTweets: Tweet[] = [];

    if (user.following.length > 0) {
      for (const followingUser of user.following) {
        followingTweets = followingTweets.concat(
          this.getUserTweets(tweetList, followingUser)
        );
      }
    }

    return followingTweets;
  }

  getMyTweetsAndMyFollowingTweets(tweetsList: Tweet[], user: User): Tweet[] {
    let myTweetsAndMyFollowingTweets: Tweet[] = [];

    // get my tweets and concat it to the empty list
    myTweetsAndMyFollowingTweets = this.getUserTweets(
      tweetsList,
      user.username
    );

    // get my following tweets and concat it to the list
    myTweetsAndMyFollowingTweets = myTweetsAndMyFollowingTweets.concat(
      this.getFollowingTweets(tweetsList, user)
    );

    myTweetsAndMyFollowingTweets = this.sortTweetsByDate(
      myTweetsAndMyFollowingTweets
    );

    this.tweetListChanged.next(myTweetsAndMyFollowingTweets);

    return myTweetsAndMyFollowingTweets;
  }

  private sortTweetsByDate(tweets: Tweet[]): Tweet[] {
    tweets.sort((firstDate: any, secondDate: any) => {
      return secondDate.creationDate - firstDate.creationDate;
    });

    return tweets;
  }
}
