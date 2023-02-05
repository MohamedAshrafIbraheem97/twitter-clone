import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserProfile } from 'src/app/profile/models/User.model';
import { UserService } from 'src/app/profile/services/user.service';

import { Tweet } from '../models/tweet.model';

import { TweetService } from '../tweet.service';

@Component({
  selector: 'app-new-tweet',
  templateUrl: './new-tweet.component.html',
  styleUrls: ['./new-tweet.component.sass'],
})
export class NewTweetComponent implements OnInit, OnDestroy {
  @ViewChild('newTweetTextarea') textarea: ElementRef;
  defaultProgress: number = 140;
  currentProgress: number = this.defaultProgress;
  loggedInUser: UserProfile;
  createTweetProgress: number;
  userSubscription: Subscription;

  // form builder is a new way of grouping reactive forms data which was form group
  constructor(
    private formBuilder: FormBuilder,
    private _tweetService: TweetService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.createTweetProgress = 0;
    this.userSubscription = this._userService.loggedInUserChanged.subscribe(
      (loggedInuser) => {
        if (loggedInuser) {
          this.loggedInUser = loggedInuser;
        }
      }
    );
    this._tweetService.uploadProgress.subscribe((data) => {
      this.createTweetProgress = data;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
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

    this._tweetService.createTweet(tweet, this.loggedInUser);

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
