
export default class VideoGames {
    private ID: string;
    private id:string;
    private titulo: string;
    private genre: string;
    private description: string;


    constructor( ID :string ,id: string, titulo: string, genre: string, description: string) {
        this.ID = ID;
        this.id = id;
        this.titulo = titulo;
        this.genre = genre;
        this.description = description;
    }

    // Getters
    public getid(): string {    
        return this.id;
    }
    public getID(): string {
        return this.ID;
    }

    public getTitle(): string {
        return this.titulo;
    }

    public getGenre(): string {
        return this.genre;
    }

    public getDescription(): string {
        return this.description;
    }

    // Setters
    public setID(id: string): void {
        this.ID = id;
    }

    public setTitle(title: string): void {
        this.titulo = title;
    }

    public setGenre(genre: string): void {
        this.genre = genre;
    }

    public setDescription(description: string): void {
        this.description = description;
    }
}
