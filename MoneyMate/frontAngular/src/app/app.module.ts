import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'

import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { ExtCurrenciesComponent } from './components/ext-currencies/ext-currencies.component';
import { NavComponent } from './components/nav/nav.component';

const rutas: Routes = [
  { path: '', component: HomeComponent },
  { path:'ext-currencies', component: ExtCurrenciesComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExtCurrenciesComponent,
    NavComponent
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(rutas),
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
