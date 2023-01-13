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
    public followers: User[],
    public following: User[],
    public website?: string
  ) {}
}
