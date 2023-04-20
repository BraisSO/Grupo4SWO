import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;


  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.form = formBuilder.group({
      username: [],
      password: []
    });
  }

  ngOnInit(): void {
    sessionStorage.clear() // Borra todo lo almacenado en sessionStorage
  }

  postLogin() {

    let userLogin = new User();
    userLogin.username = this.form.get('username')?.value;
    userLogin.password = this.form.get('password')?.value;

    this.userService.login(userLogin).subscribe(
      res => {
        sessionStorage.setItem('token', res.userToken) // Almacena el token en sessionStorage (El almacén de la sesión del navegador) bajo el nombre "token"
        this.router.navigate(['/']) //Redirixe ao home
      },
      err => {
        console.error(err)
        if (err.error =="Unauthorized"){
          Swal.fire({
            title: "This username does not exist on the database with that password.",
            text: "Try it again!",
            icon: 'error',
            width: 600,
            padding: '3em',
            color: '#ff6551',
            background: '#fff',
            confirmButtonColor: '#ff6551',
            backdrop: `
            rgba(255,101,81,0.4)
            `
          })
          this.form.reset()
        }
      });
  }
}
