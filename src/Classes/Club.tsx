import VideoGames from "./VideoGames";
import Membership from "./Membership";
import MemberUser from "./MemberUser";

export default class Club {
    private ID: string;
    private name: string;
    private description: string;
    private games: VideoGames[];
    private membershipsList: Membership[];

    constructor(id: string, name: string, description: string, games: VideoGames[]) {
        this.ID = id;
        this.name = name;
        this.description = description;
        this.games = games;
        this.membershipsList = [];
    }

    // Método para agregar un juego al club
    public addGame(title: string, genre: string, description: string): void {
        const gamesLength = this.getGames().length;
        const newId = gamesLength + 1;
        const newGame = new VideoGames(newId.toString(), title, genre, description);
        this.games.push(newGame);
    }

    public approveMembership(membershipRequest: Membership): void {
        // Validar y asociar la peticion con el club
        if (membershipRequest.getClub() === null && membershipRequest.getUserRelated() !== null) {
          this.validateMembershipRequest(membershipRequest);
          membershipRequest.setClub(this);
      
          // Añadir la membresia a la lista del usuario 
          membershipRequest.getUserRelated().addMembership(membershipRequest);
      
          // Añadir a la lista de membresias en el grupo
          this.getMembershipsList().push(membershipRequest);
        } else {
          throw new Error("Invalid membership request");
        }
      }
      
      

    private validateMembershipRequest(membershipRequest: Membership): void {
        // Validación básica:
        if (!membershipRequest.getUserRelated()) {
            throw new Error("Solicitud de membresía sin usuario");
        }

        // Validación de membresía existente:
        const existingMembership = this.findMembership(membershipRequest.getUserRelated());
        if (existingMembership) {
            throw new Error("El usuario ya es miembro del club");
        }

        // // Validación de disponibilidad de membresía:
        // const maxMembers = this.getMaxMembers();
        // const currentMembersCount = this.getMembers().length;
        // if (currentMembersCount >= maxMembers) {
        //     throw new Error("El club ha alcanzado el límite de miembros");
        // }
        // // . . . 
    }

    private findMembership(user: MemberUser): Membership | null {
        const memberships = this.getMembershipsList();
        const foundMembership = memberships.find((membership) => membership.getUserRelated() === user);
        return foundMembership ?? null; // Use the nullish coalescing operator
    }





    // Getters
    public getID(): string {
        return this.ID;
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public getGames(): VideoGames[] {
        return this.games;
    }

    public getMembershipsList(): Membership[] {
        return this.membershipsList;
    }

    public getVideogamesList(): VideoGames[] {
        return this.games;
    }


    // Setters
    public setID(id: string): void {
        this.ID = id;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setDescription(description: string): void {
        this.description = description;
    }


}
