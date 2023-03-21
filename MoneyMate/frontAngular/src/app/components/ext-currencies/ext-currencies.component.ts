import { Component, OnInit } from '@angular/core';
import { ExtMoney } from 'src/app/models/ExtMoney';
import { ExtMoneyService } from 'src/app/service/ext-money.service';
import { Router} from '@angular/router';
import { ExtCurrencyNames } from 'src/app/models/ExtCurrencyNames';


@Component({
  selector: 'app-ext-currencies',
  templateUrl: './ext-currencies.component.html',
  styleUrls: ['./ext-currencies.component.css']
})
export class ExtCurrenciesComponent implements OnInit {


  extCurrencies:ExtMoney= new ExtMoney();
  extCurrenciesNames:any= new ExtCurrencyNames();
  extCurrenciesArray:any=[];
  keys:any=[];

  constructor(private extCurrencyService:ExtMoneyService, private router:Router) { }

  ngOnInit(): void {
    this.getExtMoneyList();
    this.getExtMoneyNames();
  }

  getExtMoneyList(){
    this.extCurrencyService.getExtCurrencies().subscribe(res=>{
      console.log(res);
      this.extCurrencies=res;

      let i:number=0;
      for (const key in this.extCurrencies.eur) {
        this.keys[i]=key;
        i++;
        console.log(key, this.extCurrencies.eur[key]);
      }
      
    })

  }

  getExtMoneyNames(){
    this.extCurrencyService.getExtCurrenciesNames().subscribe(res=>{
      this.extCurrenciesNames=res;

    })
  }

}


