import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'

import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { ExtCurrenciesComponent } from './components/ext-currencies/ext-currencies.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { TokenjwtInterceptor } from './interceptors/tokenjwt.interceptor';

const rutas: Routes = [
  { path: '', component: HomeComponent },
  { path:'ext-currencies', component: ExtCurrenciesComponent },
  { path:'sign-in', component: SignInComponent },
  { path:'login', component: LoginComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExtCurrenciesComponent,
    NavComponent,
    LoginComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(rutas),
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:TokenjwtInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
