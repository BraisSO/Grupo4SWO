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
  URL:string="https:localhost:5000/api"
  private httpHeaders:HttpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http:HttpClient) { }
  
  getOwnExpenses():Observable<OwnExpenses>{
    // return this.http.get<OwnExpenses>(this.URL+"/getExpends") //.NET
    return this.http.get<OwnExpenses>(this.URL+"/expense/all") // Flask
  }

  postOwnExpenses(expense:OwnExpenses):Observable<OwnExpenses>{
    // return this.http.post<OwnExpenses>(this.URL+"/save", expense,{headers:this.httpHeaders}); // .NET
    return this.http.post<OwnExpenses>(this.URL+"/expense/new", expense,{headers:this.httpHeaders}); // Flask
  }

  clearOwnExpenses(){
    return this.http.delete(this.URL+"/clearExpends");
  }

  findByName(name:string):Observable<OwnExpenses>{
    return this.http.get<OwnExpenses>(this.URL+"/expense/by-name/"+name) // Flask
  }

  findById(id:number):Observable<OwnExpenses>{
    return this.http.get<OwnExpenses>(this.URL+"/expense/by-id/"+id) // Flask
  }

  deleteById(id:number):Observable<OwnExpenses>{
    return this.http.
  }

}
