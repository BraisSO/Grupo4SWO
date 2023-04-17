import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OwnExpenses } from '../models/OwnExpenses';

@Injectable({
  providedIn: 'root'
})
export class ownExpensesService {

  // // .Net backend URL
  // URL:string="https://localhost:7023/api"

  // Flask backend URL
  URL:string="http://localhost:5000/api/expense"
  private httpHeaders:HttpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http:HttpClient) { }
  
  getOwnExpenses():Observable<OwnExpenses>{
    // return this.http.get<OwnExpenses>(this.URL+"/getExpends") //.NET
    return this.http.get<OwnExpenses>(this.URL+"/all") // Flask
  }

  postOwnExpenses(expense:OwnExpenses):Observable<OwnExpenses>{
    // return this.http.post<OwnExpenses>(this.URL+"/save", expense,{headers:this.httpHeaders}); // .NET
    return this.http.post<OwnExpenses>(this.URL+"/new", expense,{headers:this.httpHeaders}); // Flask
  }

  // That delete method must be implemented in Flask
  clearOwnExpenses(){
    return this.http.delete(this.URL+"/clearExpends");
  }

  findByName(name:string):Observable<OwnExpenses>{
    return this.http.get<OwnExpenses>(this.URL+"/expense/by-name/"+name) // Flask
  }

  findById(id:number):Observable<OwnExpenses>{
    return this.http.get<OwnExpenses>(this.URL+"/expense/by-id/"+id) // Flask
  }

  deleteById(id:number):Observable<string>{
    return this.http.delete<string>(this.URL+"/remove/"+id) // Flask
  }

  updateById(id:number):Observable<OwnExpenses>{
    return this.http.put<OwnExpenses>(this.URL+"/expense/by-id/"+id,{headers:this.httpHeaders}) // Flask
  }

}
