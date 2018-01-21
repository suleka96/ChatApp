import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  email:string;
  password: string;
  displayName: string;
  errorMsg:string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  signUp(){
    const email= this.email;
    const password= this.password ;
    const displayName= this.displayName ;
    this.authService.signUp(email,password,displayName)
    .catch(error =>this.errorMsg= error.message);

    
  }

}
