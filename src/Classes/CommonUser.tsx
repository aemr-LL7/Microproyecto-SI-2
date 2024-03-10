import User from "./User";

export default class CommonUser implements User {
    public username: string;
    public email: string;
    private password: string;

    constructor(username: string, email: string, password: string) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public getName(): string {
        return this.username;
    }
    public getEmail(): string {
        return this.email;
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