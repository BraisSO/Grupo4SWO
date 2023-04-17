import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  form: FormGroup;


  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.form = formBuilder.group({
      username: [],
      password: []
    });
  }

  ngOnInit(): void {
  }

  logout() {
    sessionStorage.clear() // Borra todo lo almacenado en sessionStorage
    this.router.navigate(['/login']) //Redirixe ao login

  }
}
