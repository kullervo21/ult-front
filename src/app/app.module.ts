import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SignInUpComponent } from './sign-in-up-button/sign-in-up.component';
import { MenuComponent } from './menu/menu.component';
import { ListeProduitComponent } from './liste-produit/liste-produit.component';
import {HttpClientModule} from '@angular/common/http';
import {
  _MatMenuDirectivesModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatTableModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginFormComponent } from './sign-in-form/login-form.component';
import { PanierComponent } from './panier/panier.component';
import { LoginService } from './login.service';
import { LoginComponent } from './login/login.component';
import { ContentComponent } from './content/content.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInUpComponent,
    MenuComponent,
    ListeProduitComponent,
    SignUpFormComponent,
    PageNotFoundComponent,
    LoginFormComponent,
    PanierComponent,
    LoginComponent,
    ContentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    _MatMenuDirectivesModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
