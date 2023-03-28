import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OwnExpenses } from '../models/OwnExpenses';

@Injectable({
  providedIn: 'root'
})
export class ownExpensesService {

  URL:string="https://localhost:7023/api"
  private httpHeaders:HttpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http:HttpClient) { }
  
  getOwnExpenses():Observable<OwnExpenses>{
    return this.http.get<OwnExpenses>(this.URL+"/getExpends")
  }

  postOwnExpenses(expense:OwnExpenses):Observable<OwnExpenses>{
    return this.http.post<OwnExpenses>(this.URL+"/save", expense,{headers:this.httpHeaders});
  }


  clearOwnExpenses(){
    return this.http.delete(this.URL+"/clearExpends");
  }

  

}
