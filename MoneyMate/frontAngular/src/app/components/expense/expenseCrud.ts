import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { OwnExpenses } from "src/app/models/OwnExpenses";
import { OwnExpensesService } from "src/app/service/own-expenses.service";
import Swal from "sweetalert2";

export class ExpenseCrud{

    public static selectUpdate(expense:OwnExpenses, expensesTypesList:any, translate:TranslateService, ownExpensesService:OwnExpensesService, router:Router){
        let type:string = translate.instant('expensesTypes');
        let expenseText:string = translate.instant('expense');
        let amount:string = translate.instant('amount');
        let date:string = translate.instant('date');
        let completeFields:string = translate.instant('completeFields');
        let properlyUpdated:string = translate.instant('properlyUpdated');
        let wrongTryAgain:string = translate.instant("wrongTryAgain");
        
        const options = expensesTypesList.map((expenseType: { id: number; name: any; }) => `
          <option value="${expenseType.id}" ${expenseType.id === expense.expense_type_id ? 'selected' : ''}>${expenseType.name}</option>
        `).join('');
    
        Swal.fire({
          title: `Updating ${expense.name}`,
          html: `
          <div class="col-md-2">
              <div class="form-group">
                  <label for="type">${type}:</label>
                  <select class="swal2-input" id="type" name="type" value="${expense.expense_type_id}">
                      ${options}
                  </select>
              </div>
          </div>
          <div class="col-md-3">
              <div class="form-group">
                  <label for="name">${expenseText}:</label>
                  <input class="swal2-input" type="text" id="name" name="name" value="${expense.name}">
              </div>
          </div>
          <div class="col-md-2">
              <div class="form-group">
                  <label for="amount">´${amount}:</label>
                  <input class="swal2-input" type="number" id="amount" name="amount" step="1" min="0" value="${expense.amount}">
              </div>
          </div>
          <div class="col-md-2">
              <div class="form-group">
                  <label for="date">${date}:</label>
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
              Swal.showValidationMessage(completeFields)
            }
            return { expense }
          }
        }).then((result) => {
          let expenseChanged:OwnExpenses = result.value!.expense;
          ownExpensesService.update(expenseChanged).subscribe(
            res =>{
              Swal.fire({
                title: `${res.name} ${properlyUpdated}`,
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
              ExpenseCrud.checkIfRequestIsUnauthorized(err, router);
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
        })
        
      }
    
      public static deleteExpense(id:number, translate:TranslateService, ownExpensesService:OwnExpensesService, router:Router){
        let wrongTryAgain:string = translate.instant("wrongTryAgain");
        ownExpensesService.deleteById(id).subscribe(
          res =>{
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
            ExpenseCrud.checkIfRequestIsUnauthorized(err, router);
            Swal.fire({
              title: wrongTryAgain,
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
      }
    
      public static checkIfRequestIsUnauthorized(err:any, router:Router):void{
        if (err.error.msg =="Token has expired"){
          router.navigate(['/login']) //Redirixe ao login
        }
      }
}