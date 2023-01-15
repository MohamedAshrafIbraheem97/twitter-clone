import { Component, OnInit } from '@angular/core';

import { User } from '../profile/models/User.model';
import { UserService } from '../profile/services/user.service';

import { TweetTypes } from './list-tweets/tweet/tweetTypes.enum';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.sass'],
})
export class TweetsComponent implements OnInit {
  tweetTypes = TweetTypes;
  loggedInUser: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loggedInUser = this.userService.currentUser;
  }
}
