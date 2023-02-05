import { Component, OnInit } from '@angular/core';

import { UserProfile } from '../profile/models/User.model';
import { UserService } from '../profile/services/user.service';

import { TweetTypes } from 'src/app/shared/constants';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.sass'],
})
export class TweetsComponent implements OnInit {
  tweetTypes = TweetTypes;
  loggedInUser: UserProfile;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loggedInUser = this.userService.loggedInUser;
  }
}
