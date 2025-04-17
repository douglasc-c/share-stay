export class MaxSharesExceededError extends Error {
  constructor() {
    super('Maximum number of shares exceeded for this asset.')
  }
} 