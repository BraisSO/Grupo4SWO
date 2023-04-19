import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL:string="http://localhost:5000/api/user"
  private httpHeaders:HttpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http:HttpClient) { }

  signIn(user:User):Observable<User>{
    return this.http.post<User>(this.URL+"/sign-in", user,{headers:this.httpHeaders}); // Flask
  }

  login(user:User):Observable<User>{
    return this.http.post<User>(this.URL+"/login", user,{headers:this.httpHeaders}); // Flask
  }

  update(user:User):Observable<User>{
    return this.http.put<User>(this.URL+"/update", user,{headers:this.httpHeaders}); // Flask
  }

  delete():Observable<any>{
    return this.http.delete<any>(this.URL+"/remove"); // Flask
  }

  getProfile():Observable<User>{
    return this.http.get<User>(this.URL+"/my-profile"); // Flask
  }

}