import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService  {

  authenticated: boolean = false;

  constructor() { }

  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  login(username: string, password: string) {
    // Appelez l'API pour vérifier les informations d'identification
    // Si les informations sont valides, définissez la propriété loggedIn sur true
    // Retournez un observateur avec la valeur true si l'authentification a réussi, false sinon
  }

  authenticate(credentials, callback){
  console.log("dans authenticate");
    if(credentials && credentials.adresse_mail == 'user@gmail.com' && credentials.password == 'password1'){
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
    return callback && callback();
  }

  logout() {
    // Effacez les informations d'identification
    // Définissez la propriété loggedIn sur false
  }

  hasPermission(permission: string) {
    // Vérifiez si l'utilisateur actuel a le droit de permission
    // Retournez un booléen true si l'utilisateur a le droit, false sinon
  }

}
