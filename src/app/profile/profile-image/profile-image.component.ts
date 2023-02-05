import { Component, Input, OnInit } from '@angular/core';
import { UserProfile } from '../models/User.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.sass'],
})
export class ProfileImageComponent implements OnInit {
  @Input() widthAndHeight: string = '';
  @Input() user: UserProfile;

  constructor() {}

  ngOnInit(): void {}
}
