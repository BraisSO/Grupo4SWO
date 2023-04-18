import { Component, OnInit } from '@angular/core';
import { ownExpensesService } from 'src/app/service/own-expenses.service';
import { Router } from '@angular/router';
import { OwnExpenses } from 'src/app/models/OwnExpenses';
import { ExpenseTypeService } from 'src/app/service/expense-type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  typeFilter: number = 0;
  filtrado: boolean = false;
  nameToFind: string = ""
  expenseToSave: OwnExpenses = new OwnExpenses(); //obxecto que usamos para inyectar os datos do formulario e pasalo a API
  expensesList: any = []; //lista donde gardamos os datos da api
  filteredExpensesList: any = [];
  expensesTypesList: any = []
  constructor(private ownExpensesService: ownExpensesService, private expenseTypeService: ExpenseTypeService, private router: Router) { }

  ngOnInit(): void {
    this.getExpensesTypes();
    this.getOwnExpenses();
  }

  getOwnExpenses() {
    this.ownExpensesService.getOwnExpenses().subscribe(res => {
      this.expensesList = res;
    })
  }


  postOwnExpenses() {
    this.ownExpensesService.postOwnExpenses(this.expenseToSave).subscribe(
      res => {
      
       

      }

    );
    this.getExpensesTypes();
    this.getOwnExpenses();
    this.expenseToSave.amount = 0
    this.expenseToSave.date = ""
    this.expenseToSave.name = ""
  }

  clearOwnExpenses() {
    this.ownExpensesService.clearOwnExpenses().subscribe();
    location.reload();

  }

  getExpensesTypes() {
    this.expenseTypeService.getAll().subscribe(res => {
      this.expensesTypesList = res;
    })
  }

  getSameTypeExpenses() {
    this.ownExpensesService.findByType(this.typeFilter).subscribe(res => {
      console.log(res)
      this.filteredExpensesList = res;
    })
    this.filtrado = true;
  }
  getSimilarExpenses() {
    this.ownExpensesService.findSimilarExpenses(this.nameToFind).subscribe(res => {
      console.log(res)
      this.filteredExpensesList = res;
    })
    this.filtrado = true;
  }

  // prueba() {
  //   Swal.fire(
  //     {
  //       position: 'top-end',
  //       icon: 'success',
  //       title: 'Your work has been saved',
  //       showConfirmButton: false,
  //       timer: 1500
  //     }
  //   )
  // }
}