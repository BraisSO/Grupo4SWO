import { Component, OnInit } from '@angular/core';
import { OwnExpensesService } from 'src/app/service/own-expenses.service';
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

  idToUpdate:number = 0;
  expensesList: any = []; //lista donde gardamos os datos da api
  expensesTypesList: any = []
  constructor(private ownExpensesService: OwnExpensesService, private expenseTypeService: ExpenseTypeService, private router: Router) { }

  ngOnInit(): void {
    this.getExpensesTypes();
    this.getOwnExpenses();
  }

  getOwnExpenses() {
    this.ownExpensesService.getOwnExpenses().subscribe(res => {
      this.expensesList = res;
    },
    err=>{
      this.checkIfRequestIsUnauthorized(err);
    })
  }

  clearOwnExpenses() {
    Swal.fire({
      title: 'Do you really want to remove all expenses from your account?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#ff6551',
      backdrop: `
      rgba(255,101,81,0.4)
      `,
      confirmButtonText: 'Yes, remove all my expenses!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ownExpensesService.clearOwnExpenses().subscribe(
          res =>{
            let message:string = res.message;
            Swal.fire(
              'All expenses removed!',
              message,
              'success',
            )
          },
          err=>{
            this.checkIfRequestIsUnauthorized(err);
            Swal.fire({
              title: 'Something where wrong, press the update button again.',
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
    location.reload();
  }

  getExpensesTypes() {
    this.expenseTypeService.getAll().subscribe(res => {
      this.expensesTypesList = res;
      },
      err =>{
        this.checkIfRequestIsUnauthorized(err);
      })
  }

  selectUpdate(expense:OwnExpenses){
    const options = this.expensesTypesList.map((expenseType: { id: number; name: any; }) => `
      <option value="${expenseType.id}" ${expenseType.id === expense.expense_type_id ? 'selected' : ''}>${expenseType.name}</option>
    `).join('');
    Swal.fire({
      title: `Updating ${expense.name}`,
      html: `
      <div class="col-md-2">
          <div class="form-group">
              <label for="type">Type:</label>
              <select class="swal2-input" id="type" name="type" value="${expense.expense_type_id}">
                  ${options}
              </select>
          </div>
      </div>
      <div class="col-md-3">
          <div class="form-group">
              <label for="name">Expense:</label>
              <input class="swal2-input" type="text" id="name" name="name" value="${expense.name}">
          </div>
      </div>
      <div class="col-md-2">
          <div class="form-group">
              <label for="amount">Amount:</label>
              <input class="swal2-input" type="number" id="amount" name="amount" step="1" min="0" value="${expense.amount}">
          </div>
      </div>
      <div class="col-md-2">
          <div class="form-group">
              <label for="date">Date:</label>
              <input class="swal2-input" type="date" id="date" name="date" value="${expense.date}">
          </div>
      </div>
      `,
      confirmButtonText: 'update',
      confirmButtonColor: '#3085d6',
      focusConfirm: false,
      preConfirm: () => {
          const type:HTMLInputElement = Swal.getPopup()!.querySelector('#type')!
          const name:HTMLInputElement = Swal.getPopup()!.querySelector('#name')!
          const amount:HTMLInputElement = Swal.getPopup()!.querySelector('#amount')!
          const date:HTMLInputElement = Swal.getPopup()!.querySelector('#date')!

          expense.name = name.value;
          expense.amount = Number(amount.value);
          expense.date = date.value;
          expense.expense_type_id = Number(type.value);

        if (!expense.name || !expense.amount || !expense.expense_type_id) {
          Swal.showValidationMessage(`Please complete the fields`)
        }
        return { expense }
      }
    }).then((result) => {
      let expenseChanged:OwnExpenses = result.value!.expense
      this.ownExpensesService.update(expenseChanged).subscribe(
        res =>{
          Swal.fire({
            title: `${res.name} expense was updated properly.`,
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
          this.checkIfRequestIsUnauthorized(err);
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
    })
    
  }

  deleteExpense(id:number){
    this.ownExpensesService.deleteById(id).subscribe(
      res =>{
        console.log(res.message)
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
        this.checkIfRequestIsUnauthorized(err);
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
    this.resetPageView()
  }

  checkIfRequestIsUnauthorized(err:any):void{
    if (err.error = "Unauthorized"){
      this.router.navigate(['/login']) //Redirixe ao login
    }
  }

  resetPageView(){
    this.getExpensesTypes();
    this.getOwnExpenses();
  }
}