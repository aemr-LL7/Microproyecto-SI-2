export default interface Usuario {
  username: string;
  email: string;
  getName(): string;
  setName(newName: string): void;
  getEmail(): string;
  setEmail(newEmail: string): void;
}