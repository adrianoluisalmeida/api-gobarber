export default interface IHashProvider {
  generateHash(provider: string): Promise<string>;
  compareHash(payload: string, hashed: string): Promise<boolean>;
}
