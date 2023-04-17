import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  user= new User();
  constructor(private userService:UserService, private router:Router) { }


  ngOnInit(): void {
  }

  postSignIn(){
    console.log(this.user);
    this.userService.signIn(this.user).subscribe();
    this.router.navigate(["/login"]); //reenvia a login
  }
}
