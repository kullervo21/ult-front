import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {

  form = new FormGroup({
    prenomControl: new FormControl('', [Validators.required]),
    nomControl:  new FormControl('', [Validators.required]),
    rueControl:  new FormControl('', [Validators.required]),
    cpControl:  new FormControl('', [Validators.required, Validators.pattern('[0-9]{5}')]),
    villeControl:  new FormControl('', [Validators.required]),
    telControl:  new FormControl('', [Validators.required, Validators.pattern('[0][0-9]{9}')]),
    mailControl:  new FormControl('', [Validators.required, Validators.email]),
    passwdControl:  new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^.*[A-Z].*$/)]),
  });

  hide = true;
  nom;
  prenom;
  rue;
  cp;
  ville;
  telephone;
  password;
  adresse_mail;


  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {
  }
  getErrorMessageMail() {
    return this.form.get('mailControl').hasError('required') ? 'Vous devez entrer un mail' :
      this.form.get('mailControl').hasError('email') ? 'Le format de l\'email n\'est pas bon':'';
  }
  getErrorMessageNom() {
    return this.form.get('nomControl').hasError('required') ? 'Vous devez entrer un nom' : '';
  }
  getErrorMessagePrenom() {
    return this.form.get('prenomControl').hasError('required') ? 'Vous devez entrer un prénom' : '';
  }
  getErrorMessageRue() {
    return this.form.get('rueControl').hasError('required') ? 'Vous devez entrer votre adresse' : '';
  }
  getErrorMessageCp() {
    return this.form.get('cpControl').hasError('required') ? 'Vous devez entrer votre code postal' :
      this.form.get('cpControl').hasError('pattern') ? 'Le format du code postal n\'est pas bon':'';
  }
  getErrorMessageVille() {
    return this.form.get('villeControl').hasError('required') ? 'Vous devez entrer votre ville' :'';
  }
  getErrorMessageTel() {
    return this.form.get('telControl').hasError('required') ? 'Vous devez entrer votre numéro de téléphone' :
      this.form.get('telControl').hasError('pattern') ? 'Le format du numéro de téléphone n\'est pas bon':'';
  }
  getErrorMessagePasswd() {
    return this.form.get('passwdControl').hasError('required') ? 'Vous devez entrer un mot de passe' :
      (this.form.get('passwdControl').hasError('minlength') ? 'Il faut un minimum de 8 caractères':
        (this.form.get('passwdControl').hasError('pattern') ? 'Il faut une majuscule':''));
  }

  onSubmit() {

    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    this.httpClient.post('http://localhost:8080/addUser', JSON.stringify(
      {
        adresse_mail: this.form.get("this.adresse_mail").value,
        nom: this.form.get("this.nom").value,
        prenom: this.form.get("this.prenom").value,
        adresse: this.form.get("this.rue").value,
        cp: this.form.get("this.cp").value,
        ville: this.form.get("this.ville").value,
        telephone: this.form.get("this.telephone").value,
        password: this.form.get("this.password").value
      }),
      {headers}).subscribe((res: { message: string }) => {
        console.log(res);
      if (res.message == 'Utilisateur créé avec succès') {
        this.router.navigate(['/produits']);
      }
    });

  }

}
