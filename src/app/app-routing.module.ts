import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { ExploreComponent } from './explore/explore.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { ErrorHandlingComponent } from './shared-components/error-handling/error-handling.component';
import { TweetDetailsComponent } from './tweets/list-tweets/tweet-details/tweet-details.component';
import { TweetResolverService } from './tweets/tweet-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'explore', component: ExploreComponent },
  // { path: 'auth', component: AuthComponent },
  {
    path: 'profile/:username',
    children: [
      { path: '', component: ProfileComponent },
      {
        path: 'tweet/:tweetId',
        component: TweetDetailsComponent,
        resolve: [TweetResolverService],
      },
    ],
  },
  { path: 'settings', component: SettingsComponent },
  {
    path: 'error',
    component: ErrorHandlingComponent,
    data: { errorMessage: 'An Error occured' },
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
