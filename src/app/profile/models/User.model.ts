export class User {
  constructor(
    public username: string,
    public name: string,
    public image: string,
    public birthdate: Date,
    public location: string,
    public accountCreation: Date,
    public description: string
  ) {}
}
