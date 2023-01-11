import { User } from 'src/app/profile/models/User.model';

export class Tweet {
  constructor(
    public content: string,
    public creationDate: Date,
    public creator: User,
    public retweet: number,
    public isLikedBy?: User[],
    public replies?: Tweet[]
  ) {}
}
