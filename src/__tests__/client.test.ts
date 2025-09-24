import { PrimeBotApiClient, AuthProvider, NoAuth } from '../index';

describe('PrimeBotApiClient', () => {
  let client: PrimeBotApiClient;

  beforeEach(() => {
    client = new PrimeBotApiClient();
  });

  test('should create client with default configuration', () => {
    expect(client).toBeInstanceOf(PrimeBotApiClient);
    expect(client.teams).toBeDefined();
    expect(client.matches).toBeDefined();
  });

  test('should create client with no auth', () => {
    const noAuthClient = PrimeBotApiClient.withoutAuth();
    expect(noAuthClient).toBeInstanceOf(PrimeBotApiClient);
  });

  test('should create client with basic auth', () => {
    const basicAuthClient = PrimeBotApiClient.withBasicAuth('user', 'pass');
    expect(basicAuthClient).toBeInstanceOf(PrimeBotApiClient);
  });

  test('should create client with cookie auth', () => {
    const cookieAuthClient = PrimeBotApiClient.withCookieAuth('session123');
    expect(cookieAuthClient).toBeInstanceOf(PrimeBotApiClient);
  });
});

describe('NoAuth', () => {
  test('should return empty headers', () => {
    const auth = new NoAuth();
    expect(auth.getHeaders()).toEqual({});
  });
});
