import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { AppUser } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  users : AppUser[]=[];
  authenticatedUser : AppUser | undefined;

  constructor() {
    this.users.push({ mail : "test@gmail.com", password : "azerty", roles : ["user"]});
    this.users.push({ mail : "admin@gmail.com", password : "Rootroot", roles : ["user", "admin"]});
    this.users.push({ mail : "test2@gmail.com", password : "1234", roles : ["user"]});
  }

  public login(mail : string, password : string) : Observable<AppUser> {
    let appUser = this.users.find(user => user.mail == mail);
    if(!appUser) return throwError(new Error("User not found"));
    if(appUser.password != password){
      return throwError(new Error("Bad credentials"));
    }
    return of(appUser);
  }

  public authenticateUser(appUser : AppUser): Observable<boolean>{
    this.authenticatedUser = appUser;
    localStorage.setItem("authUser", JSON.stringify( {mail : appUser.mail, roles : appUser.roles, jwt : "JWT_TOKEN" }))
    return of(true);
  }

  public hasRole(role : string) : boolean {
    return this.authenticatedUser!.roles.includes(role);
  }

  public isAuthenticated() {
    return this.authenticatedUser!=undefined;
  }

}
