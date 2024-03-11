
export default class Usuarios {
    public name: string;
    public lastname: string;
    public email: string;
    private password: string;
    private juego: string;
    private clubs: string[];
    constructor(name: string,lastname:string, email: string, password: string, juego: string, clubs: string[]) {
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.juego = juego;
        this.clubs = clubs;
    }
    public getName(): string {
        return this.name;
    }
    public getLastName(): string {
        return this.lastname;
    }
    public getEmail(): string {
        return this.email;
    }
    public getJuego(): string {
        return this.juego;
    }
    public getClubs(): string[] {
        return this.clubs;
    }
    public addClub(club: string): void {
        // Asegurarse de que el club no esta en la lista del usuario
        if (this.getClubs().some((existingClub) => existingClub === club)) {
            throw new Error("Club already exists for this user");
        }

        // Añade el club a la lista del usuario
        this.getClubs().push(club);
    }
    public setName(newName: string): void {
        this.name = newName;
    }
    public setLastName(newLastName: string): void {
        this.lastname = newLastName;
    }
    public setEmail(newEmail: string): void {
        this.email = newEmail;
    }
    public setPassword(newPass: string): void {
        this.password = newPass;
    }
    public setJuego(newJuego: string): void {
        this.juego = newJuego;
    }
    public setClubs(newClubs: string[]): void {
        this.clubs = newClubs;
    }
}