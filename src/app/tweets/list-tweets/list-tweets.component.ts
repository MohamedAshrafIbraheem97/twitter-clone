import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tweet } from '../models/tweet.model';
import { TweetService } from '../tweet.service';

@Component({
  selector: 'app-list-tweets',
  templateUrl: './list-tweets.component.html',
  styleUrls: ['./list-tweets.component.sass'],
})
export class ListTweetsComponent implements OnInit, OnDestroy {
  tweets: Tweet[] = [];
  subscription: Subscription;

  constructor(private tweetService: TweetService) {}

  ngOnInit(): void {
    this.tweets = this.tweetService.getTweets();

    this.subscription = this.tweetService.tweetListChanged.subscribe(
      (tweets: Tweet[]) => {
        this.tweets = tweets;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
