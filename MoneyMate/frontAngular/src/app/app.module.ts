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
import { TokenjwtGuard } from './guards/tokenjwt.guard';
import { LogoutComponent } from './components/logout/logout.component';
import { ExpenseTypeComponent } from './components/expense-type/expense-type.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { NgxPaginationModule } from 'ngx-pagination';

const rutas: Routes = [
  { path: '', component: HomeComponent, canActivate: [TokenjwtGuard] },
  { path:'ext-currencies', component: ExtCurrenciesComponent, canActivate: [TokenjwtGuard] },
  { path:'sign-in', component: SignInComponent },
  { path:'login', component: LoginComponent },
  { path:'logout', component: LogoutComponent, canActivate: [TokenjwtGuard] },
  { path:'expense-type', component: ExpenseTypeComponent, canActivate: [TokenjwtGuard] },
  { path:'expense', component: ExpenseComponent, canActivate: [TokenjwtGuard] },
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExtCurrenciesComponent,
    NavComponent,
    LoginComponent,
    SignInComponent,
    LogoutComponent,
    ExpenseTypeComponent,
    ExpenseComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(rutas),
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:TokenjwtInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
