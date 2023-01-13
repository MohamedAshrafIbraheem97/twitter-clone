import { Component, OnInit } from '@angular/core';
import { User } from '../profile/models/User.model';
import { UserService } from '../profile/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass'],
})
export class NavComponent implements OnInit {
  currentUser: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.currentUser = this.userService.currentUser;
  }
}
