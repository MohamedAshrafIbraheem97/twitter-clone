import { Token } from '@angular/compiler';
import { Tweet } from 'src/app/tweets/models/tweet.model';

export class UserAccount {
  constructor(public email: string, public password: string) {}
}

export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  kind: string;
  displayName?: string;
}

export class LoggedInUserSession {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpiraitionDate: Date
  ) {}

  get token() {
    if (
      !this._tokenExpiraitionDate ||
      this._tokenExpiraitionDate < new Date()
    ) {
      return null;
    }

    return this._token;
  }
}

export class UserProfile {
  constructor(
    public username: string,
    public name: string,
    public profileImage: string,
    public headerImage: string,
    public birthdate: Date,
    public accountCreation: Date,
    public followers: string[], // "Followers" are the users who follow you. >>> this string is username
    public following: string[], // “Following” is the users who you follow. >>> this string is username
    public description?: string,
    public location?: string,
    public website?: string
  ) {}
}
