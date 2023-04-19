import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

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

  logout():void {
    sessionStorage.clear() // Borra todo lo almacenado en sessionStorage
    this.router.navigate(['/login']) //Redirixe ao login

  }

  userUpdate():void{
    this.userService.getProfile().subscribe(
      res =>{
        let myProfile = res
        Swal.fire({
          title: `Update ${myProfile.username}`,
          width: 800,
          padding: '3em',
          color: '#2c3e50',
          background: '#fff',
          backdrop: `
          rgba(255,228,196,0.4)
          `,
          html: `
              <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" class="swal2-input" id="username" name="username" value="${myProfile.username}">
                <br>
                <label for="email">email:</label>
                <input class="swal2-input" type="email" id="email" name="email" value="${myProfile.email}">
                <br>
                <label for="password">Password:</label>
                <input class="swal2-input" type="password" id="password" name="password" autocomplete="on">
                <br>
                <label for="firstName">First name:</label>
                <input class="swal2-input" type="text" id="firstName" name="firstName" value="${myProfile.first_name}">
                <br>
                <label for="surname1">First surname:</label>
                <input class="swal2-input" type="text" id="surname1" name="surname1"value="${myProfile.surname1}">
                <br>
                <label for="surname2">Second surname (If apply):</label>
                <input class="swal2-input" type="text" id="surname2" name="surname2" value="${myProfile.surname2}">
              </div>
          `,
          confirmButtonText: 'update',
          confirmButtonColor: '#3085d6',
          focusConfirm: false,
          preConfirm: () => {
              const username:HTMLInputElement = Swal.getPopup()!.querySelector('#username')!
              const firstName:HTMLInputElement = Swal.getPopup()!.querySelector('#firstName')!
              const password:HTMLInputElement = Swal.getPopup()!.querySelector('#password')!
              const surname1:HTMLInputElement = Swal.getPopup()!.querySelector('#surname1')!
              const surname2:HTMLInputElement = Swal.getPopup()!.querySelector('#surname2')!
    
              myProfile.username = username.value;
              myProfile.first_name = firstName.value;
              myProfile.password = password.value;
              myProfile.surname1 = surname1.value;
              myProfile.surname2 = surname2.value;
    
            if (!myProfile.username || !myProfile.first_name || !myProfile.surname1 || !myProfile.password) {
              Swal.showValidationMessage(`Please complete the fields`)
            }
            return { myProfile }
          }
        }).then((result) => {
          let myProfileChanged:User = result.value!.myProfile
          this.userService.update(myProfileChanged).subscribe(
            res =>{
              Swal.fire({
                title: `${res.username} profile was updated properly.`,
                width: 600,
                padding: '3em',
                color: '#93e264',
                background: '#fff',
                confirmButtonColor: '#93e264',
                backdrop: `
                rgba(0,123,6,0.4)
                `
              })
            },
            err=>{
              Swal.fire({
                title: 'Something where wrong, try it again.',
                width: 600,
                padding: '3em',
                color: '#ff6551',
                background: '#fff',
                confirmButtonColor: '#ff6551',
                backdrop: `
                rgba(255,101,81,0.4)
                `
              })
            }
          );
        })
      },
      err => {
        Swal.fire({
          title: 'Something where wrong, press the update button again.',
          width: 600,
          padding: '3em',
          color: '#ff6551',
          background: '#fff',
          confirmButtonColor: '#ff6551',
          backdrop: `
          rgba(255,101,81,0.4)
          `
        })
      }
    )
  }

  deleteAccount():void{
    Swal.fire({
      title: 'Do you really want to delete your account?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#ff6551',
      confirmButtonText: 'Yes, delete my account!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete().subscribe(
          res => {
            let username:string = res.username;
            Swal.fire(
              'Profile deleted!',
              `We will miss you so bad, ${username}`,
              'error'
            )
            sessionStorage.clear();
            this.router.navigate(['/sign-in']);
          },
          err =>{
            console.error(err)
          }
        );
      }
    })
  }
}
