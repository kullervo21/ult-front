import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-liste-produit',
  templateUrl: './liste-produit.component.html',
  styleUrls: ['./liste-produit.component.scss']
})
export class ListeProduitComponent implements OnInit {
  listeProduit: any[] = [];
  displayedColumns: string[] = ['Nom', 'Description', 'Prix', 'Image', 'Quantité'];
  dataSource = new MatTableDataSource(this.listeProduit);
  client = null;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {

    const clientJson = localStorage.getItem('client');
    if(clientJson) {
      this.client = JSON.parse(clientJson);
    }

    this.httpClient.get('http://localhost:8080/listProduit').subscribe((res:any[]) => {
      this.listeProduit = res;
      this.dataSource = new MatTableDataSource(this.listeProduit);
    });
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(){
  const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
      this.httpClient.delete('http://127.0.0.1:8080/deleteCategorie/666',
        {headers}).subscribe((res: { message: string }) => {
          console.log(res);
      });
  }

  ajoutPanier(produit: any, quantity: HTMLInputElement) {

    let commandeJson: any = localStorage.getItem('commande');
    let commande;

    if (commandeJson == null) {
      commande = {
        client: this.client,
        ligneCommandeList: []
      }
    } else {
      commande = JSON.parse(commandeJson);
    }

    // parcours des lignes de commande
    /*for (let i=0; commande.ligneCommandeList.length; i++){
      // si le produit existe déjà dans la liste
      console.log(commande.ligneCommandeList[i].produit.nomProduit);
      if(commande.ligneCommandeList[i].produit.numeroProduit === produit.numeroProduit){
        // on ajoute la quantité
        commande.ligneCommandeList[i].qteCommandee += quantity.value;
      } else {
        console.log(commande.ligneCommandeList[i].produit.nomProduit);
        // sinon on crée une nouvelle ligne
        commande.ligneCommandeList.push(
          {
            qteCommandee: quantity.value,
            produit: produit
          });
        localStorage.setItem('commande', JSON.stringify(commande));
          }
      }
    }*/

    // tslint:disable-next-line:max-line-length
    let ligneDeCommandeExistante = commande.ligneCommandeList.find(ligneCommande => ligneCommande.produit.numeroProduit == produit.numeroProduit);
    if(ligneDeCommandeExistante == null) {
      commande.ligneCommandeList.push({
          qteCommandee: quantity.value,
          produit: produit
      });
    } else {
      ligneDeCommandeExistante.qteCommandee = parseInt(ligneDeCommandeExistante.qteCommandee) + parseInt(quantity.value);
    }

    localStorage.setItem('commande', JSON.stringify(commande));
  }

  //   commande.ligneCommandeList.push(
  //     {
  //       qteCommandee: quantity.value,
  //       produit: produit
  //     });
  //
  //   localStorage.setItem('commande', JSON.stringify(commande));
  // }


  validerPanier() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    this.httpClient
      .post('http://localhost:8080/ajoutPanier', localStorage.getItem('commande'), {headers})
      .subscribe((res: any) => {;
        console.log(res)
      });

  }
}
