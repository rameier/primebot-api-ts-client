export class PrimeBotApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: any
  ) {
    super(message);
    this.name = 'PrimeBotApiError';
  }
}

export class AuthenticationError extends PrimeBotApiError {
  constructor(message: string = 'Authentication failed') {
    super(message, 401);
    this.name = 'AuthenticationError';
  }
}

export class NotFoundError extends PrimeBotApiError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

export class ValidationError extends PrimeBotApiError {
  constructor(message: string = 'Validation failed') {
    super(message, 400);
    this.name = 'ValidationError';
  }
}

export class NetworkError extends PrimeBotApiError {
  constructor(message: string = 'Network error occurred') {
    super(message);
    this.name = 'NetworkError';
  }
}
