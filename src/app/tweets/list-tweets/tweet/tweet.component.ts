import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/profile/models/User.model';
import { UserService } from 'src/app/profile/services/user.service';
import { IconName } from 'src/app/shared-components/icon/IconName';
import { Constants } from 'src/app/shared/constants';
import { Tweet } from '../../models/tweet.model';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.sass'],
})
export class TweetComponent implements OnInit {
  @Input('tweetData') tweet: Tweet;
  user: UserProfile;
  tweetDate: string = '';

  likeIcon: IconName = IconName.LIKE;
  replyIcon: IconName = IconName.REPLY;
  retweetIcon: IconName = IconName.RETWEET;

  constructor(private _userService: UserService, private _router: Router) {}

  ngOnInit(): void {
    this.getUser();
    this.handlingDate();
  }

  getUser() {
    this.user = this._userService.getUserByUsername(this.tweet.creator)!;
  }

  OnTweetClick(tweet: Tweet) {
    this._router.navigate(['/profile', tweet.creator, 'tweet', tweet._tweetId]);

    // [routerLink]="['/profile', user.username, 'tweet', tweet._tweetId]"
  }

  handlingDate() {
    let tweetDate = this.tweet.creationDate;
    let currentDate = new Date();
    let datePreview = '';

    if (currentDate.getFullYear() === tweetDate.getFullYear()) {
      if (currentDate.getMonth() === tweetDate.getMonth()) {
        if (currentDate.getDate() === tweetDate.getDate()) {
          if (currentDate.getHours() === tweetDate.getHours()) {
            datePreview =
              currentDate.getMinutes() - tweetDate.getMinutes() + 'm';
          } else {
            datePreview = currentDate.getHours() - tweetDate.getHours() + 'h';
          }
        } else {
          datePreview =
            Constants.MONTH_NAMES[tweetDate.getMonth()] +
            ' ' +
            tweetDate.getDate();
        }
      }
    } else {
      datePreview =
        Constants.MONTH_NAMES[tweetDate.getMonth()] +
        ' ' +
        tweetDate.getDate() +
        ', ' +
        tweetDate.getFullYear();
    }

    this.tweetDate = datePreview;
  }
}
