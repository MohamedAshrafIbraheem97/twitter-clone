import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-tweet',
  templateUrl: './new-tweet.component.html',
  styleUrls: ['./new-tweet.component.sass'],
})
export class NewTweetComponent {
  @ViewChild('newTweetTextarea') textarea: any;
  defaultProgress: number = 140;
  currentProgress: number = this.defaultProgress;
  constructor(private fb: FormBuilder) {}

  newTweet = this.fb.group({
    tweet: ['', [Validators.required, Validators.maxLength(140)]],
  });

  onSubmit() {
    console.log(this.newTweet);
    // console.log(this.newTweet.value.tweet);
  }

  private calculateProgress() {
    if (this.newTweet.value.tweet?.length) {
      this.currentProgress =
        this.defaultProgress - this.newTweet.value.tweet?.length;
    } else {
      this.currentProgress = 140;
    }
  }

  inputChanged() {
    this.calculateProgress();

    let textarea = this.textarea.nativeElement;

    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
}
