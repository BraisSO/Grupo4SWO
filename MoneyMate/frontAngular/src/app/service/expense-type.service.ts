import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExpenseType } from '../models/ExpenseType';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseTypeService {
  
  URL:string="http://localhost:5000/api/expense-type"
  private httpHeaders:HttpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http:HttpClient) { }

  getAll():Observable<ExpenseType>{
    return this.http.get<ExpenseType>(this.URL+"/all") // Flask
  }

  getByName(name:string):Observable<ExpenseType>{
    return this.http.get<ExpenseType>(this.URL+"/by-name/"+name) // Flask
  }

  getById(id:number):Observable<ExpenseType>{
    return this.http.get<ExpenseType>(this.URL+"/by-id/"+id) // Flask
  }

  save(expenseType:ExpenseType):Observable<ExpenseType>{
    return this.http.post<ExpenseType>(this.URL+"/save", expenseType,{headers:this.httpHeaders}); // Flask
  }

  update(expenseType:ExpenseType):Observable<ExpenseType>{
    return this.http.put<ExpenseType>(this.URL+"/update/"+expenseType.id, expenseType,{headers:this.httpHeaders}); // Flask
  }

  remove(id:number):Observable<any>{
    return this.http.delete<any>(this.URL+"/remove/"+id); // Flask
  }

}
