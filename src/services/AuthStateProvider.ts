
import { User } from '@models/User';
import { AuthState } from '@models/types/AuthState';
import { JwtToken } from '@models/types/JwtToken';
import jwt_decode from 'jwt-decode';

export class AuthStateProvider {
  private tokenKey: string = "groenlundAuthToken";
  private accessToken: string;
  //private userRole: "SuperAdmin" | "Admin" | "User" | "Guest";


  public trySilentAuthenticateUser = async (): Promise<AuthState> => {
    let result: AuthState;
    // Look in local-storage for a token that grants authorization
    this.accessToken = this.tryFindPreviousToken();
    if (this.accessToken && this.accessToken !== "") {
      result = this.signIn(this.accessToken);
    }

    return result;
  }

  public signIn = (token: string): AuthState => {
    this.setToken(token);
    const decodedjwt: JwtToken = jwt_decode(token);

    const user: User = {
      email: decodedjwt['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
      firstName: decodedjwt['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'].split(' ')[0],
      lastName: decodedjwt['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'].split(' ')[1],
      role: decodedjwt['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    }

    const state: AuthState = {
      user: user,
      expiration: decodedjwt.exp
    }

    return state;
  }

  public signOut = (): AuthState => {
    this.removeToken();

    const state: AuthState = {
      user: new User(),
      expiration: "",
    }

    return state;
  }

  private setToken = (token: string): void => {
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
