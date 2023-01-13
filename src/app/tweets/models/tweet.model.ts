import { User } from 'src/app/profile/models/User.model';

export class Tweet {
  constructor(
    public content: string,
    public creationDate: Date,
    public retweet: number,
    public creator: User,
    public isLikedBy?: User[],
    public replies?: Tweet[]
  ) {}
}
