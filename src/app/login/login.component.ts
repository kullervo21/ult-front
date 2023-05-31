import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import { LoginService } from '../login.service'
import { AuthenticationService } from '../services/authentication.service'

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin = new FormGroup({
    mailControl: new FormControl('', [Validators.required, Validators.email]),
    passwdControl: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^.*[A-Z].*$/)]),
  });
  password;
  adresseMail;
  hide = true;
  credential = {adresse_mail: '', password: ''};
  errorMessage : string;

  constructor(private httpClient: HttpClient,
              private authService: AuthenticationService,
              private router: Router
  ) { }

  ngOnInit() {
  }

  getErrorMessageMail() {
    return this.formLogin.get('mailControl').hasError('required') ? 'Vous devez entrer un mail' :
      this.formLogin.get('mailControl').hasError('email') ? 'Le format de l\'email n\'est pas bon':'';
  }
  getErrorMessagePasswd() {
    return this.formLogin.get('passwdControl').hasError('required') ? 'Vous devez entrer un mot de passe' :
      (this.formLogin.get('passwdControl').hasError('minlength') ? 'Il faut un minimum de 8 caractères':
        (this.formLogin.get('passwdControl').hasError('pattern') ? 'Il faut une majuscule':''));
  }

  logUser() {
    this.credential.adresse_mail = this.formLogin.value.mailControl;
    this.credential.password =  this.formLogin.value.passwdControl;
    this.authService.login(this.credential.adresse_mail, this.credential.password).subscribe({
      next :(appUser)=>{
        this.authService.authenticateUser(appUser).subscribe( {
          next : (data)=>{
            this.router.navigateByUrl("/home")
          }
        });
      },
      error : (err) => {
        this.errorMessage = err;
      }
    });
  }
}
