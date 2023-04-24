import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseType } from 'src/app/models/ExpenseType';
import { OwnExpenses } from 'src/app/models/OwnExpenses';
import { ExpenseTypeService } from 'src/app/service/expense-type.service';
import { OwnExpensesService } from 'src/app/service/own-expenses.service';
import Swal from 'sweetalert2';
import { ExpenseCrud } from '../expense/expenseCrud';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-expense-type',
  templateUrl: './expense-type.component.html',
  styleUrls: ['./expense-type.component.css']
})
export class ExpenseTypeComponent implements OnInit {

  currentExpensesPage:number = 1;
  expensesPerPage:number = 12;
  currentExpensesTypesPage:number = 1;
  expensesTypesPerPage:number = 12;
  idToUpdate:number = 0;
  typeFilter:number = 0;
  filtrado: boolean = false;
  expenseTypeToSave:ExpenseType = new ExpenseType()
  filteredExpensesList: any = [];
  expensesTypesList: any = []
  constructor(private ownExpensesService: OwnExpensesService, private expenseTypeService: ExpenseTypeService, private translate:TranslateService, private router: Router) { }

  ngOnInit(): void {
    this.getExpensesTypes();
    this.expenseTypeToSave.id =0;
  }

  getExpensesTypes() {
    this.expenseTypeService.getAll().subscribe(res => {
      this.expensesTypesList = res;
      },
      err =>{
        ExpenseCrud.checkIfRequestIsUnauthorized(err, this.router);
      })
  }

  getSameTypeExpenses() {
    this.ownExpensesService.findByType(this.typeFilter).subscribe(res => {
      this.filteredExpensesList = res;
      },
      err=>{
        ExpenseCrud.checkIfRequestIsUnauthorized(err, this.router);
      })
    this.filtrado = true;
  }

  postNewExpensesType(){
    this.expenseTypeService.save(this.expenseTypeToSave).subscribe(
      res =>{
        this.resetPage()
        Swal.fire({
          title: `Expense type: ${res.name}  was saved properly.`,
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
      err=>{
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
    this.resetPage()
  }

  updateExpenseType(expenseType:ExpenseType){
    Swal.fire({
      title: `Updating ${expenseType.name}`,
      html: `
      <div class="col-md-3">
          <div class="form-group">
              <label for="name">Expense type:</label>
              <input class="swal2-input" type="text" id="name" name="name" value="${expenseType.name}">
          </div>
      </div>
      `,
      confirmButtonText: 'update',
      confirmButtonColor: '#3085d6',
      focusConfirm: false,
      preConfirm: () => {
          const name:HTMLInputElement = Swal.getPopup()!.querySelector('#name')!

          expenseType.name = name.value;

        if (!expenseType.name ) {
          Swal.showValidationMessage(`Please complete the field`)
        }
        return { expenseType }
      }
    }).then((result) => {
      let expenseTypeChanged:ExpenseType = result.value!.expenseType
      this.expenseTypeService.update(expenseTypeChanged).subscribe(
        res =>{
          this.resetPage()
          Swal.fire({
            title: `expense type ${res.name} was updated properly.`,
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
        err=>{
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
    })
  }

  deleteExpenseType(id:number){
    this.expenseTypeService.remove(id).subscribe(
      res =>{
        this.resetPage()
        Swal.fire({
          title: `${res.message}`,
          width: 600,
          padding: '3em',
          color: '#93e264',
          background: '#fff',
          backdrop: `
          rgba(0,123,6,0.4)
          `
        })
      },
      err=>{
        ExpenseCrud.checkIfRequestIsUnauthorized(err, this.router);
        Swal.fire({
          title: 'Something where wrong, try it again.',
          width: 600,
          padding: '3em',
          color: '#ff6551',
          background: '#fff',
          backdrop: `
          rgba(255,101,81,0.4)
          `
        })
      }
    );
    this.resetPage()
  }
    
  resetPage():void{
    this.getExpensesTypes();
    this.expenseTypeToSave.name = ""
  }

  //Methods from expenses
  updateExpense(expense:OwnExpenses){
    ExpenseCrud.selectUpdate(expense, this.expensesTypesList, this.translate, this.ownExpensesService, this.router)
    this.resetPage();
  }

  deleteExpense(id:number){
    ExpenseCrud.deleteExpense(id, this.translate, this.ownExpensesService, this.router)
    this.resetPage()
  }

}