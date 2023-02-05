import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import {
  UserProfile,
  UserAccount,
  AuthResponse,
} from '../profile/models/User.model';

const KEY = 'AIzaSyAcVJOA_l_Bmg-y5PccEFcnGsl65RNULic';
@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private _http: HttpClient) {}

  isEmailUsed(email: string) {
    return this._http
      .post<{ allProviders: string[]; registered: boolean }>(
        `https://identitytoolkit.googleapis.com/v1/accounts:createAuthUri?key=${KEY}`,
        {
          identifier: email,
          continueUri: 'http://localhost:4200/home',
        }
      )
      .pipe(catchError(this.handleErrors));
  }

  createAccount(userAccount: UserAccount): Observable<AuthResponse> {
    return this._http
      .post<AuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${KEY}`,
        {
          email: userAccount.email,
          password: userAccount.password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleErrors));
  }

  createProfile(userId: string, userProfile: UserProfile) {
    return this._http
      .put(
        'https://ng-twitter-clone-6d5eb-default-rtdb.firebaseio.com/users.json',
        {
          [userId]: {
            ...userProfile,
          },
        }
      )
      .pipe(catchError(this.handleErrors));
  }

  login(userAccount: UserAccount): Observable<AuthResponse> {
    return this._http
      .post<AuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${KEY}`,
        {
          email: userAccount.email,
          password: userAccount.password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleErrors));
  }

  getUserById(userId: string): Observable<UserProfile> {
    return this._http
      .get<UserProfile>(
        `https://ng-twitter-clone-6d5eb-default-rtdb.firebaseio.com/users/${userId}.json`
      )
      .pipe(
        map((response) => {
          let modifiedUserData = {
            ...response,
            followers: !response.followers ? [] : response.followers,
            following: !response.following ? [] : response.following,
          };
          return modifiedUserData;
        })
      );
  }

  private handleErrors(errorResponse: any) {
    let errorMessage = 'Error Occured';

    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(() => errorMessage);
    }

    switch (errorResponse.error.error.message) {
      case 'EMAIL_NOT_FOUND':
      case 'INVALID_PASSWORD':
        errorMessage = 'Email or Password is wrong';
        break;
      case 'USER_DISABLED':
        errorMessage = 'The user account has been disabled by an administrator';
        break;
      case 'EMAIL_EXISTS':
        errorMessage = 'This email is used Before';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'Too many bad requests, try again later';
        break;
      case 'INVALID_EMAIL':
        errorMessage = 'Invalid email';
        break;
    }

    return throwError(() => errorMessage);
  }
}
