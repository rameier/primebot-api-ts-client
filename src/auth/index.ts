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
    const credentials = btoa(`${this.username}:${this.password}`);
    return {
      Authorization: `Basic ${credentials}`,
    };
  }
}

export class CookieAuth implements AuthProvider {
  constructor(private sessionId: string) {}

  getHeaders(): Record<string, string> {
    // Sanitize sessionId to prevent HTTP header injection via CRLF characters
    const sanitizedSessionId = this.sessionId.replace(/[\r\n]/g, '');
    return {
      Cookie: `sessionid=${sanitizedSessionId}`,
    };
  }
}
