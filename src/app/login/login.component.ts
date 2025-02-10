import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string='';
  password: string='';
  
  // route
  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  login() {
    if(this.email==="admin@gmail.com" && this.password==="admin"){
      // alert("Login Successfull");
      this.route.navigate(['/rooms']);
      // this.route.navigatebyUrl(['/rooms/add']);
      // this.route.navigate(['/rooms', 'add']);
    }
  }
}
