import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in-up',
  templateUrl: './sign-in-up.component.html',
  styleUrls: ['./sign-in-up.component.scss']
})
export class SignInUpComponent implements OnInit {

  client = null;
  @Output() signIn: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  ngOnInit() {
    const clientJson = localStorage.getItem('client');
    if(clientJson) {
      this.client = JSON.parse(clientJson);
      this.signIn.emit(true);
    }
  }
  versInscription = function() {
    this.router.navigate(['/inscription'])
  }
  versIdentification(){
    this.router.navigate(['/identification'])
  }

  deconnection() {
    localStorage.removeItem('client');
    localStorage.removeItem('commande');
    location.href = '/';
  }

  versPanier() {
    this.router.navigate(['/panier'])
  }

}
