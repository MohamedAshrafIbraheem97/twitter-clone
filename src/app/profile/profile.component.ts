import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { User } from './models/User.model';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      let user = this.userService.getUser(params['username']);
      if (user) {
        this.user = user;
      } else {
        this.router.navigate([`/${params['username']}`], {
          relativeTo: this.activatedRoute,
        });
      }
    });
  }
}
