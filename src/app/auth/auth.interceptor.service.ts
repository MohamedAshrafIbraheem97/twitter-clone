import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, take } from 'rxjs';
import { UserService } from '../profile/services/user.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private _userService: UserService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this._userService.loggedInUserSessionChanged.pipe(
      take(1),
      exhaustMap((userSession) => {
        if (!userSession) {
          return next.handle(req);
        }

        let modifiedRequest = req.clone({
          params: new HttpParams().set('auth', userSession.token),
        });

        return next.handle(modifiedRequest);
      })
    );
  }
}
