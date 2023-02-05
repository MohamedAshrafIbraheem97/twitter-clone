import { UserProfile } from 'src/app/profile/models/User.model';

export class Tweet {
  constructor(
    public _tweetId: string,
    public content: string,
    public creationDate: Date,
    public retweet: string[], // usernames []
    public creator: string, // creator username
    public isLikedBy?: string[],
    public replies?: string[] // tweet ids []
  ) {}
}
