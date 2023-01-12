import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/profile/models/User.model';

import { Tweet } from '../models/tweet.model';

import { TweetService } from '../tweet.service';

@Component({
  selector: 'app-new-tweet',
  templateUrl: './new-tweet.component.html',
  styleUrls: ['./new-tweet.component.sass'],
})
export class NewTweetComponent {
  @ViewChild('newTweetTextarea') textarea: ElementRef;
  defaultProgress: number = 140;
  currentProgress: number = this.defaultProgress;

  user = new User(
    'imMohamedAshraf',
    'mido',
    '',
    new Date(1997, 2, 12),
    'Egypt',
    new Date(2020, 2, 12),
    'my description'
  );

  // form builder is a new way of grouping reactive forms data which was form group
  constructor(
    private formBuilder: FormBuilder,
    private tweetService: TweetService
  ) {}

  tweetForm = this.formBuilder.group({
    tweet: new FormControl('', [
      Validators.required,
      Validators.maxLength(140),
    ]),
  });

  onTweetCreation() {
    let tweet = new Tweet(
      this.tweetForm.value['tweet']!,
      new Date(),
      this.user,
      0
    );
    this.tweetService.createTweet(tweet);
  }

  inputChanged() {
    this.calculateProgress();
    this.increaseTextAreaHeight();
  }

  private calculateProgress() {
    if (this.tweetForm.value.tweet?.length) {
      this.currentProgress =
        this.defaultProgress - this.tweetForm.value.tweet?.length;
    } else {
      this.currentProgress = 140;
    }
  }

  private increaseTextAreaHeight() {
    let textarea = this.textarea.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
}
