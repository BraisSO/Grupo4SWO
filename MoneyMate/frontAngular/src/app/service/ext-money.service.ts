import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExtMoney } from '../models/ExtMoney';
import { ExtCurrencyNames } from '../models/ExtCurrencyNames';


@Injectable({
  providedIn: 'root'
})
export class ExtMoneyService {

  URLGET:string="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json";

  constructor(private http:HttpClient) { }

  getExtCurrencies():Observable<ExtMoney>{
    return this.http.get<ExtMoney>(this.URLGET);
  }

  getExtCurrenciesNames():Observable<ExtCurrencyNames>{
    return this.http.get<ExtCurrencyNames>("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json")
  }

}
