import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {

  listeProduit : any[] = [];
  displayedColumns: string[] = ['Nom', 'Description', 'Prix', 'Image', 'Quantité'];
  datasource;


  constructor() { }

  ngOnInit() {


    let commandeJson: any = localStorage.getItem('commande');

    if(commandeJson) {
      let commande = JSON.parse(commandeJson);

      this.listeProduit = commande['ligneCommandeList'];
      console.log(this.listeProduit)
      this.datasource = new MatTableDataSource(this.listeProduit);
    } else {
      this.datasource = new MatTableDataSource([]);
    }

   }



  }


