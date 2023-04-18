import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  log:string = "Login"
  logRoute:string = "/login"
  constructor() { }

  ngOnInit(): void {
    let token = sessionStorage.getItem('token');
    if(!token){
      this.log = "Login"
      this.logRoute = "/login"
    }else{
      this.log = "Logout"
      this.logRoute = "/logout"
    }
  }

}
