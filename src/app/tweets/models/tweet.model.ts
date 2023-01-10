import { User } from 'src/app/profile/models/User.model';

export interface Tweet {
  content: string;
  creationDate: Date;
  creator: User;
  likes?: User[];
  retweet?: number;
  replies?: Tweet[];
}
