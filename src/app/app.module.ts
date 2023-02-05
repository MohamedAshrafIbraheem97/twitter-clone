import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { TweetsComponent } from './tweets/tweets.component';
import { NewTweetComponent } from './tweets/new-tweet/new-tweet.component';
import { ListTweetsComponent } from './tweets/list-tweets/list-tweets.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileImageComponent } from './profile/profile-image/profile-image.component';
import { TweetDetailsComponent } from './tweets/list-tweets/tweet-details/tweet-details.component';
import { TweetComponent } from './tweets/list-tweets/tweet/tweet.component';
import { IconComponent } from './shared-components/icon/icon.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorHandlingComponent } from './shared-components/error-handling/error-handling.component';
import { AuthComponent } from './auth/auth.component';
import { FooterComponent } from './footer/footer.component';
import { ExploreComponent } from './explore/explore.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthInterceptorService } from './auth/auth.interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ContentComponent,
    HeaderComponent,
    HomeComponent,
    TweetsComponent,
    NewTweetComponent,
    ListTweetsComponent,
    ProfileComponent,
    ProfileImageComponent,
    TweetDetailsComponent,
    TweetComponent,
    IconComponent,
    NotFoundComponent,
    ErrorHandlingComponent,
    AuthComponent,
    FooterComponent,
    ExploreComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
