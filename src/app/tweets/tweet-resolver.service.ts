import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

import { Tweet } from './models/tweet.model';
import { TweetService } from './tweet.service';

@Injectable({
  providedIn: 'root',
})
export class TweetResolverService implements Resolve<Tweet> {
  constructor(private _tweetService: TweetService, private router: Router) {}

  //   handleError(error: any) {
  //     this.router.navigate(['/error'], { data.errorMessage = 'this tweet is not found' });
  //     return throwError(() => new error());
  //   }

  resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let tweetId = router.params['tweetId'];

    return this._tweetService.fetchTweetById(tweetId);
    //   .pipe(catchError((err) => this.handleError(err)));

    // return this.siteService.detail(siteID).pipe(
    //     map(resp => {
    //       return {site: resp as Site};
    //     }),
    //     catchError(err => this.handleError(err))
    //   );
  }
}
