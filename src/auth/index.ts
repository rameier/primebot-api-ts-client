export interface AuthProvider {
  getHeaders(): Record<string, string>;
}

export class NoAuth implements AuthProvider {
  getHeaders(): Record<string, string> {
    return {};
  }
}

export class BasicAuth implements AuthProvider {
  constructor(
    private username: string,
    private password: string
  ) {}

  getHeaders(): Record<string, string> {
    // Note: In a real implementation, you would need to handle base64 encoding
    // For now, we'll expect the consumer to provide already encoded credentials
    // or handle encoding in their environment
    const credentials = btoa(`${this.username}:${this.password}`);
    return {
      Authorization: `Basic ${credentials}`,
    };
  }
}

export class CookieAuth implements AuthProvider {
  constructor(private sessionId: string) {}

  getHeaders(): Record<string, string> {
    return {
      Cookie: `sessionid=${this.sessionId}`,
    };
  }
}
