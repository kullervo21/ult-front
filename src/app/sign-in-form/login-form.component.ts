import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  formLogin = new FormGroup({
    mailControl: new FormControl('', [Validators.required, Validators.email]),
    passwdControl: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^.*[A-Z].*$/)]),
            })
  password;
  adresse_mail;
  hide = false;



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
    console.log(this.formLogin.value);
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    this.httpClient.post('http://localhost:8080/addUser', JSON.stringify(
      {
        adresse_mail: this.adresse_mail,
        password: this.password
      }),
      {headers}).subscribe((res: { message: string }) => {


    /*  if (res.message == 'Utilisateur créé avec succès') {
        this.router.navigate(['/produits']);
      }
      else {
        alert('Verifiez le formulaire votre enregistrement c\'est mal passé')
      }*/
    });

  }

}
