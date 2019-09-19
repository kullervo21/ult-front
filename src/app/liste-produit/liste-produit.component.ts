import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-liste-produit',
  templateUrl: './liste-produit.component.html',
  styleUrls: ['./liste-produit.component.scss']
})
export class ListeProduitComponent implements OnInit {
  listeProduit: any[] = [];
  displayedColumns: string[] = ['Nom', 'Description', 'Prix', 'Image']
  dataSource = new MatTableDataSource(this.listeProduit);

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get('http://localhost:8080/listProduit').subscribe((res:any[]) => {
      this.listeProduit = res;
      this.dataSource = new MatTableDataSource(this.listeProduit);
    });
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }





}
