import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/models/UserLogin';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup;
  
  
  constructor(private formBuilder:FormBuilder, private userService:UserService, private router:Router) {
    this.form = formBuilder.group({
      username : [],
      password : []
    });
   }

  ngOnInit(): void {
  }

  postLogin(){
    
    let username = this.form.get('username')?.value;
    let password =  this.form.get('password')?.value;
    let userLogin = new UserLogin(username, password);
    this.userService.login(userLogin).subscribe(
      res=> {
        sessionStorage.setItem('token', res.userToken) // Almacena el token en sessionStorage (El almacén de la sesión del navegador) bajo el nombre "token"
        this.router.navigate(['/']) //Redirixe ao home
      },
      err=> {
        console.error(err)
        
      });
  }
}
