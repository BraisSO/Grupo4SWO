import { Component, OnInit } from '@angular/core';
import { ownExpensesService } from 'src/app/service/own-expenses.service';
import { Router } from '@angular/router';
import { OwnExpenses } from 'src/app/models/OwnExpenses';
import { ExpenseTypeService } from 'src/app/service/expense-type.service';
import Swal from 'sweetalert2';
import { ExpenseType } from 'src/app/models/ExpenseType';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  idToUpdate:number = 0;
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
      res =>{
        Swal.fire({
          title: `${res.name} expense was saved properly.`,
          width: 600,
          padding: '3em',
          color: '#93e264',
          background: '#fff',
          backdrop: `
          rgba(0,123,6,0.4)
          `
        })
      },
      eror=>{
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
    this.resetPageView();
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
            backdrop: `
            rgba(0,123,6,0.4)
            `
          })
        },
        eror=>{
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
      eror=>{
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



  resetPageView(){
    this.getExpensesTypes();
    this.getOwnExpenses();
    this.expenseToSave.amount = 0
    this.expenseToSave.date = ""
    this.expenseToSave.name = ""
  }
}