import Club from './Club';
import Membership from './Membership';
import User from './User';

export default class MemberUser implements User {
    public username: string;
    public email: string;
    private password: string;
    private clubs: Club[];
    private memberships: Membership[];

    constructor(username: string, email: string, password: string) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.clubs = [];
        this.memberships = [];
    }

    public addMembership(membership: Membership): void {
        // Asegurarse de que la membresia no esta en la lista del usuario
        if (this.getMemberships().some((existingMembership) => existingMembership === membership)) {
            throw new Error("Membership already exists for this user");
        }

        // Añade la membresia a la lista del usuario
        this.getMemberships().push(membership);
    }


    public getName(): string {
        return this.username;
    }

    public getEmail(): string {
        return this.email;
    }

    public getMemberships(): Membership[] {
        return this.memberships;
    }

    public setName(newName: string): void {
        this.username = newName;
    }

    public setEmail(newEmail: string): void {
        this.email = newEmail;
    }

    public setPassword(newPass: string): void {
        this.password = newPass;
    }
}