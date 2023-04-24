import { Component, OnInit } from '@angular/core';
import { OwnExpensesService } from 'src/app/service/own-expenses.service';
import { Router } from '@angular/router';
import { OwnExpenses } from 'src/app/models/OwnExpenses';
import { ExpenseTypeService } from 'src/app/service/expense-type.service';
import Swal from 'sweetalert2';
import { ExpenseCrud } from './expenseCrud';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  currentPage:number = 1;
  expensesPerPage:number = 12;
  idToUpdate: number = 0;
  filtrado: boolean = false;
  nameToFind: string = ""
  expenseToSave: OwnExpenses = new OwnExpenses(); //obxecto que usamos para inyectar os datos do formulario e pasalo a API
  filteredExpensesList: any = [];
  expensesTypesList: any = []
  constructor(private ownExpensesService: OwnExpensesService, private expenseTypeService: ExpenseTypeService,private translate:TranslateService, private router: Router) { }

  ngOnInit(): void {
    this.getExpensesTypes();
  }



  postOwnExpenses() {
    this.ownExpensesService.postOwnExpenses(this.expenseToSave).subscribe(
      res => {
        Swal.fire({
          title: `${res.name} expense was saved properly.`,
          width: 600,
          padding: '3em',
          color: '#93e264',
          background: '#fff',
          confirmButtonColor: '#93e264',
          backdrop: `
            rgba(0,123,6,0.4)
            `
        })
      },
      err => {
        ExpenseCrud.checkIfRequestIsUnauthorized(err, this.router);
        Swal.fire({
          title: 'Something where wrong, try it again.',
          width: 600,
          padding: '3em',
          color: '#ff6551',
          background: '#fff',
          confirmButtonColor: '#ff6551',
          backdrop: `
            rgba(255,101,81,0.4)
            `
        })
      }
    );
    this.resetPageView();
  }

  getExpensesTypes() {
    this.expenseTypeService.getAll().subscribe(res => {
      this.expensesTypesList = res;
    },
      err => {
        ExpenseCrud.checkIfRequestIsUnauthorized(err, this.router);
      })
  }


  getSimilarExpenses() {
    this.ownExpensesService.findSimilarExpenses(this.nameToFind).subscribe(res => {
      this.filteredExpensesList = res;
    },
      err => {
        ExpenseCrud.checkIfRequestIsUnauthorized(err, this.router);
      })
    this.filtrado = true;
  }

  selectUpdate(expense: OwnExpenses) {
    ExpenseCrud.selectUpdate(expense, this.expensesTypesList, this.translate, this.ownExpensesService, this.router)
    this.resetPageView();
  }

  deleteExpense(id: number) {
    ExpenseCrud.deleteExpense(id, this.translate, this.ownExpensesService, this.router)
    this.resetPageView()
  }

  resetPageView() {
    this.getExpensesTypes();
    this.expenseToSave.amount = 0
    this.expenseToSave.date = ""
    this.expenseToSave.name = ""
    this.nameToFind = ""
  }
}
