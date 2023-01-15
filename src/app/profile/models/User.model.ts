import { Tweet } from 'src/app/tweets/models/tweet.model';

export class User {
  constructor(
    public username: string,
    public name: string,
    public profileImage: string,
    public headerImage: string,
    public birthdate: Date,
    public location: string,
    public accountCreation: Date,
    public description: string,
    public followers: User[], // "Followers" are the users who follow you.
    public following: User[], // “Following” is the users who you follow.
    public tweets: Tweet[],
    public website?: string
  ) {}
}
