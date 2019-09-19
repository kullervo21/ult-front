import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in-up',
  templateUrl: './sign-in-up.component.html',
  styleUrls: ['./sign-in-up.component.scss']
})
export class SignInUpComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  versInscription = function() {
    this.router.navigate(['/inscription'])
  }
  versIdentification(){
    this.router.navigate(['/identification'])
  }
}
