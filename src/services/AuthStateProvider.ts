
import User from '@models/User';
import jwt_decode from 'jwt-decode';


export interface IAuthState {
  user: User;
  expiration: string;
  claims?: Claim[];
}

export interface JwtToken {
  exp: string;
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': string;
}

class Claim {
  constructor(public type: string, public value: string) { }
}

export class AuthStateProvider {
  private tokenKey: string = "groenlundAuthToken";
  private accessToken: string;
  //private userRole: "SuperAdmin" | "Admin" | "User" | "Guest";


  public async trySilentAuthenticateUser(): Promise<IAuthState> {
    let result: IAuthState;
    // Look in local-storage for a token that grants authorization
    this.accessToken = this.tryFindPreviousToken();
    if (this.accessToken && this.accessToken !== "") {
      result = await this.signIn(this.accessToken);
    }

    return result;
  }

  public async signIn(token: string): Promise<IAuthState> {
    this.setToken(token);
    const decodedjwt: JwtToken = jwt_decode(token);

    const user: User = {
      email: decodedjwt['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
      firstName: decodedjwt['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'].split(' ')[0],
      lastName: decodedjwt['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'].split(' ')[1],
      role: decodedjwt['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    }

    const state: IAuthState = {
      user: user,
      expiration: decodedjwt.exp
    }

    // const identity = new ClaimsIdentity(claims, 'jwt');
    // const user = new ClaimsPrincipal(identity);
    // const state = new AuthenticationState(user, await this.getAccessToken());

    return state;
  }

  public async signOut(): Promise<IAuthState> {
    this.removeToken();

    const state: IAuthState = {
      user: new User(),
      expiration: "",
    }
    // const user = new ClaimsPrincipal(new ClaimsIdentity());
    // const state = new AuthenticationState(user);

    return state;
  }

  private setToken(token: string): void {
    this.accessToken = token;
    localStorage.setItem(this.tokenKey, token);
  }
  private removeToken(): void {
    localStorage.removeItem(this.tokenKey);
    this.accessToken = "";
  }

  private tryFindPreviousToken(): string {
    const previousToken: string = localStorage[this.tokenKey];
    if (previousToken) {
      return previousToken
    }
    return "";
  }
}

export default AuthStateProvider;