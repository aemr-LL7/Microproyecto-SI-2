
export default class VideoGames {
    private ID: string;
    private title: string;
    private genre: string;
    private description: string;

    constructor(id: string, title: string, genre: string, description: string) {
        this.ID = id;
        this.title = title;
        this.genre = genre;
        this.description = description;
    }

    // Getters
    public getID(): string {
        return this.ID;
    }

    public getTitle(): string {
        return this.title;
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
        this.title = title;
    }

    public setGenre(genre: string): void {
        this.genre = genre;
    }

    public setDescription(description: string): void {
        this.description = description;
    }
}
