import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

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
import { ReactiveFormsModule } from '@angular/forms';

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
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
