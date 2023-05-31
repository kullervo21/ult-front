import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToMenu(){
    /* signature de la méthode navigate : navigate(commands: any[], extras?: NavigationExtras): Promise<boolean>;
    *     - commands est un tableau d'objets qui décrivent le chemin d'itinéraire à suivre,
    *     - extras est un objet qui définit des options supplémentaires pour la navigation.
    */
    this.router.navigate(['/home', { outlets: { bodyContent: ['produits'] }}], { skipLocationChange: true })
  }


}
