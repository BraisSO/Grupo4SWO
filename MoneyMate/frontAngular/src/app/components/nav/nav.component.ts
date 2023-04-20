import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  log:string = 'Login'
  logRoute:string = "/login";
  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    let token = sessionStorage.getItem('token');
    if(!token){
      this.translate.onLangChange.subscribe(()=>
      {
        this.log = this.translate.instant('login')
      })
      this.logRoute = "/login"
    }else{
      this.translate.onLangChange.subscribe(()=>
      {
        this.log = this.translate.instant('logout')
      })
      this.logRoute = "/logout"
    }
  }

}
