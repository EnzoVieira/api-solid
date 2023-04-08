export class MaxNumberOfCheckInsError extends Error {
  constructor() {
    super("max number of check-ins reached.")
  }
}
