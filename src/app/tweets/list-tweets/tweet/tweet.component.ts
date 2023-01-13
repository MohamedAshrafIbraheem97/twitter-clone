import { Component, Input, OnInit } from '@angular/core';
import { IconName } from 'src/app/shared-components/icon/IconName';
import { Tweet } from '../../models/tweet.model';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.sass'],
})
export class TweetComponent implements OnInit {
  @Input('tweetData') tweet: Tweet;

  likeIcon: IconName = IconName.LIKE;
  replyIcon: IconName = IconName.REPLY;
  retweetIcon: IconName = IconName.RETWEET;

  // prettier-ignore
  MonthNames: string[] = ['Jan','Feb','Mar','Apr','May','Jun',
                          'Jul','Aug','Sep','Oct','Nov','Dec',];

  ngOnInit(): void {}

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
            datePreview = currentDate.getHours() - tweetDate.getHours() + 'H';
          }
        } else {
          datePreview =
            this.MonthNames[tweetDate.getMonth()] + ' ' + tweetDate.getDate();
        }
      }
    } else {
      datePreview =
        this.MonthNames[tweetDate.getMonth()] +
        ' ' +
        tweetDate.getDate() +
        ', ' +
        tweetDate.getFullYear();
    }

    return datePreview;
  }
}
