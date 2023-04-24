import { Component, OnInit } from '@angular/core';
import { OwnExpensesService } from 'src/app/service/own-expenses.service';
import { Router } from '@angular/router';
import { OwnExpenses } from 'src/app/models/OwnExpenses';
import { ExpenseTypeService } from 'src/app/service/expense-type.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { ExpenseCrud } from '../expense/expenseCrud';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentPage:number = 1;
  expensesPerPage:number = 12;
  idToUpdate:number = 0;
  expensesList: any = []; //lista donde gardamos os datos da api
  expensesTypesList: any = []
  constructor(private ownExpensesService: OwnExpensesService, private expenseTypeService: ExpenseTypeService,private translate:TranslateService, private router: Router) { }

  ngOnInit(): void {
    this.getExpensesTypes();
    this.getOwnExpenses();
  }

  getOwnExpenses() {
    this.ownExpensesService.getOwnExpenses().subscribe(res => {
      this.expensesList = res;
    },
    err=>{
      ExpenseCrud.checkIfRequestIsUnauthorized(err, this.router);
    })
  }

  clearOwnExpenses() {

    let removeAllQuestion:string = this.translate.instant('removeAllQuestion')
    let removeAllAdvertice:string = this.translate.instant('removeAllAdvertice')
    let removeAllButton:string = this.translate.instant('removeAllButton')
    let removeAllSuccess:string = this.translate.instant('removeAllSuccess')
    let wrongTryAgain:string = this.translate.instant("wrongTryAgain")
    
    Swal.fire({
      title: removeAllQuestion,
      text: removeAllAdvertice,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#ff6551',
      backdrop: `
      rgba(255,101,81,0.4)
      `,
      confirmButtonText: removeAllButton
    }).then((result) => {
      if (result.isConfirmed) {
        this.ownExpensesService.clearOwnExpenses().subscribe(
          res =>{
            let message:string = res.message;
            Swal.fire(
              removeAllSuccess,
              message,
              'success',
            )
          },
          err=>{
            ExpenseCrud.checkIfRequestIsUnauthorized(err, this.router);
            Swal.fire({
              title: wrongTryAgain,
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
      }
    });
    this.resetPageView();
  }

  getExpensesTypes() {
    this.expenseTypeService.getAll().subscribe(res => {
      this.expensesTypesList = res;
      },
      err =>{
        ExpenseCrud.checkIfRequestIsUnauthorized(err, this.router);
      })
  }

  selectUpdate(expense:OwnExpenses){
    ExpenseCrud.selectUpdate(expense, this.expensesTypesList, this.translate, this.ownExpensesService, this.router)
    this.resetPageView();
  }

  deleteExpense(id:number){
    ExpenseCrud.deleteExpense(id, this.translate, this.ownExpensesService, this.router)
    this.resetPageView()
  }

  resetPageView(){
    this.getExpensesTypes();
    this.getOwnExpenses();
  }
}