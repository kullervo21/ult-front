import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import { LoginService } from '../login.service'

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
    hide = true;
    credential = { adresse_mail: '', password: '' };



  constructor(private httpClient: HttpClient,
              private loginService: LoginService,
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
    this.credential.adresse_mail = this.formLogin.get("mailControl").value;
    this.credential.password = this.formLogin.get("passwdControl").value;
    this.loginService.authenticate(this.credential, () => {
      console.log("hello");
      this.router.navigateByUrl('/inscription')
    });
  }

}
