import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Tweet } from '../../models/tweet.model';
import { TweetService } from '../../tweet.service';

@Component({
  selector: 'app-tweet-details',
  templateUrl: './tweet-details.component.html',
  styleUrls: ['./tweet-details.component.sass'],
})
export class TweetDetailsComponent implements OnInit, OnChanges {
  tweet: Tweet;
  tweetId: string;
  errorContent: string = '';

  constructor(
    private _tweetService: TweetService,
    private currentRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentRoute.params.subscribe((params: Params) => {
      this.tweetId = params['tweetId'];
    });

    this._tweetService.fetchTweetById(this.tweetId).subscribe({
      next: (tweet) => {
        this.tweet = tweet;
        // console.log('hhhh');
      },
      error: (error) => {
        console.log(error);

        this.errorContent = 'and error happened';
      },
    });
  }

  ngOnChanges() {
    console.log();
  }
}
