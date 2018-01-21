import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  email : string;
  password: string;
  errorMsg: string;

  constructor(private auth: AuthService,private router: Router) { }

  ngOnInit() {
  }

  login(){
      this.auth.login(this.email,this.password)
      .catch( error => this.errorMsg=error.message);
  }

}
