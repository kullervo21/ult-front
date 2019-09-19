import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListeProduitComponent} from './liste-produit/liste-produit.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {SignUpFormComponent} from './sign-up-form/sign-up-form.component';
import {LoginFormComponent} from './sign-in-form/login-form.component';
import {PanierComponent} from './panier/panier.component';


const routes: Routes = [

  { path: 'produits', component: ListeProduitComponent },
  { path: 'inscription', component: SignUpFormComponent },
  { path: 'identification', component:  LoginFormComponent },
  { path:'panier', component: PanierComponent},
  {
    path: '',
    redirectTo: '/produits',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
