import { Injectable, OnInit } from '@angular/core';
import { exhaustMap, map, Subject, take, tap } from 'rxjs';

import { UserProfile } from '../profile/models/User.model';
import { Tweet } from './models/tweet.model';
import { UserService } from '../profile/services/user.service';
import {
  HttpClient,
  HttpEventType,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { TweetTypes } from 'src/app/shared/constants';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TweetService {
  tweetListChanged = new Subject<Tweet[]>();
  isLoadingState = new Subject<boolean>();
  loadingState: boolean = false;
  currentUser: UserProfile;
  anonymousUser: UserProfile;
  allTweets: Tweet[] = [];
  currentTweets: Tweet[] = [];
  uploadProgress = new Subject<number>();

  constructor(
    private _userService: UserService,
    private _httpClient: HttpClient
  ) {
    this.currentUser = this._userService.loggedInUser;
    this.anonymousUser = this._userService.getUserByUsername('midooo')!;
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

  fetchTweetsByType(tweetsType: TweetTypes, user: UserProfile): Tweet[] {
    this._httpClient
      .get<Tweet[]>(`${environment.BASE_URL}tweets.json`)
      .pipe(
        map((responseData) => {
          this.loadingState = true;
          this.isLoadingState.next(this.loadingState);

          let tweets: Tweet[] = [];

          for (const key in responseData) {
            tweets.push(
              new Tweet(
                key,
                responseData[key].content,
                new Date(responseData[key].creationDate),
                responseData[key].retweet ? responseData[key].retweet : [],
                responseData[key].creator,
                responseData[key].isLikedBy ? responseData[key].isLikedBy : [],
                responseData[key].replies ? responseData[key].replies : []
              )
            );
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

  fetchTweetById(tweetId: string) {
    return this._httpClient
      .get<Tweet>(`${environment.BASE_URL}tweets/${tweetId}.json`)
      .pipe(
        map((responseData) => {
          let tweet: Tweet = new Tweet(
            responseData._tweetId,
            responseData.content,
            new Date(responseData.creationDate),
            responseData.retweet ? responseData.retweet : [],
            responseData.creator,
            responseData.isLikedBy ? responseData.isLikedBy : [],
            responseData.replies ? responseData.replies : []
          );

          return tweet;
        })
      );
  }

  createTweet(tweet: Tweet, creator: UserProfile) {
    return this._httpClient
      .post(`${environment.BASE_URL}tweets.json`, tweet, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe((event) => {
        // tracking progress
        if (event.type === HttpEventType.UploadProgress) {
          let percentDone = Math.round((100 * event.loaded) / event.total!);
          this.uploadProgress.next(percentDone);
        }
        // the load is done so continue my work
        else if (event.type === HttpEventType.Response) {
          this.allTweets.unshift(tweet);
          this.fetchTweetsByType(
            TweetTypes.mineAndMyFollowingTweets,
            this._userService.loggedInUser
          );
          this.tweetListChanged.next(this.allTweets);
          this.uploadProgress.next(0);
        }
      });
  }

  getTweetsBasedOnType(
    wantedTweetType: any,
    tweetsList: Tweet[],
    user: UserProfile
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

  getFollowingTweets(tweetList: Tweet[], user: UserProfile): Tweet[] {
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

  getMyTweetsAndMyFollowingTweets(
    tweetsList: Tweet[],
    user: UserProfile
  ): Tweet[] {
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
