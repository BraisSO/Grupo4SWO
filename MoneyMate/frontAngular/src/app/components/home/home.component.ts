import { Component, OnInit } from '@angular/core';
import { ownExpensesService } from 'src/app/service/own-expenses.service';
import { Router } from '@angular/router';
import { OwnExpenses } from 'src/app/models/OwnExpenses';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  expense= new OwnExpenses(); //obxecto que usamos para inyectar os datos do formulario e pasalo a API
  expensesList:any=[]; //lista donde gardamos os datos da api
  constructor(private ownExpensesService:ownExpensesService, private router:Router) { }

  ngOnInit(): void {
    this.getOwnExpenses();
    console.log(this.expense)
  }

  getOwnExpenses(){
    this.ownExpensesService.getOwnExpenses().subscribe(res=>{
      this.expensesList=res;
      console.log(res);
    })
  }


  postOwnExpenses(){
    console.log(this.expense);
    this.ownExpensesService.postOwnExpenses(this.expense).subscribe();
    location.reload(); //recarga de la pagina
  }
  
  clearOwnExpenses(){
    this.ownExpensesService.clearOwnExpenses().subscribe();
    location.reload();

  }

  }


