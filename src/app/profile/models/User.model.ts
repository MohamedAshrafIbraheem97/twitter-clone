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
    public followers: string[], // "Followers" are the users who follow you. >>> this string is username
    public following: string[], // “Following” is the users who you follow. >>> this string is username
    public website?: string
  ) {}
}
