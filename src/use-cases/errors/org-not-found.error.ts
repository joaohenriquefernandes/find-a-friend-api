export default class OrgNotFoundError extends Error {
  constructor() {
    super('Organization not found.')
  }
}
