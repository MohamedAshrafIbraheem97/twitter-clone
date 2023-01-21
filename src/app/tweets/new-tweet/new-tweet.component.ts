import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DataStorageService } from 'src/app/data-storage.service';
import { User } from 'src/app/profile/models/User.model';
import { UserService } from 'src/app/profile/services/user.service';

import { Tweet } from '../models/tweet.model';

import { TweetService } from '../tweet.service';

@Component({
  selector: 'app-new-tweet',
  templateUrl: './new-tweet.component.html',
  styleUrls: ['./new-tweet.component.sass'],
})
export class NewTweetComponent implements OnInit {
  @ViewChild('newTweetTextarea') textarea: ElementRef;
  defaultProgress: number = 140;
  currentProgress: number = this.defaultProgress;
  loggedInUser: User;
  progress: number;

  // form builder is a new way of grouping reactive forms data which was form group
  constructor(
    private formBuilder: FormBuilder,
    private tweetService: TweetService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.progress = 0;
    this.loggedInUser = this.userService.currentUser;
    this.tweetService.uploadProgress.subscribe((data) => {
      this.progress = data;
      // console.log(data);
    });
  }

  tweetForm = this.formBuilder.group({
    tweet: new FormControl('', [
      Validators.required,
      Validators.maxLength(140),
    ]),
  });

  onTweetCreation() {
    let tweet = new Tweet(
      '',
      this.tweetForm.value['tweet']!,
      new Date(),
      [],
      this.loggedInUser.username
    );

    this.tweetService.createTweet(tweet, this.loggedInUser);

    this.resetForm();
  }

  inputChanged() {
    this.calculateProgress();
    this.increaseTextAreaHeight();
  }

  private resetForm() {
    this.tweetForm.reset();
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
