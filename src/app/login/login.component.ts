import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  submitted = false
  signupform!: NgForm;
  constructor() { }

  ngOnInit(): void {
  }

  submitform(form:NgForm){
    this.submitted=true;

    if (!form.valid) {
			return;
		}

		const email = form.value.email;
		const password = form.value.password;



    this.signupform.reset();
  }

}
