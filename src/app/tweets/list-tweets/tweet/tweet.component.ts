import { Component } from '@angular/core';
import { IconName } from 'src/app/shared-components/icon/IconName';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.sass'],
})
export class TweetComponent {
  likeIcon: IconName = IconName.LIKE;
  replyIcon: IconName = IconName.REPLY;
  retweetIcon: IconName = IconName.RETWEET;
}
