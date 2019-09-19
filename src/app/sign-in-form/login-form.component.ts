import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  formLogin = new FormGroup({
    mailControl: new FormControl('', [Validators.required, Validators.email]),
    passwdControl: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^.*[A-Z].*$/)]),
            });
  password;
  adresseMail;
  hide = true;



  constructor(private httpClient: HttpClient) { }

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

  register(){
    console.log('http://localhost:8080/logUser/'+this.adresseMail+'/'+this.password);
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    this.httpClient.post('http://localhost:8080/logUser/', JSON.stringify(
      {
        adresse_mail: this.adresseMail,
        password: this.password
      }),
      {headers}).subscribe((res: any) => {

        localStorage.setItem('client',JSON.stringify(res));

        location.href = '/';
    });

  }

}
