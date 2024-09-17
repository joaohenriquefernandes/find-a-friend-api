export default class PetNotFoundError extends Error {
  constructor() {
    super('Pet not found.')
  }
}
