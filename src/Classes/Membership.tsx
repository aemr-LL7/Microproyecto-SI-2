import Club from "./Club";
import MemberUser from "./MemberUser";
import { v4 as uuidv4 } from 'uuid';

export default class Membership {
  private ID: string;
  private userRelated: MemberUser;
  private club?: Club;

  constructor(id: string, userRelated: MemberUser) {
    this.ID = id || uuidv4(); // Generate ID if not provided
    this.userRelated = userRelated;
  }

  public getID(): string {
    return this.ID;
  }

  public getUserRelated(): MemberUser {
    return this.userRelated;
  }

  public setUserRelated(userRelated: MemberUser): void {
    this.userRelated = userRelated;
  }

  public getClub(): Club | null | undefined {
    return this.club;
  }

  public setClub(club: Club): void {
    this.club = club;
  }
}
