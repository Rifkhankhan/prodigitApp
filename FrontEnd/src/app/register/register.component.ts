import { Router } from '@angular/router';
import { AuthService } from './../Service/auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
	constructor(private authService: AuthService, private router: Router) {}
	isLoading = false;
	authSub: Subscription = new Subscription();
  locations = [
    {name: 'Sri Lanka', value: 'srilanka'},
    {name: 'India', value: 'india'},
    {name: 'Pakistan', value: 'pakistan'},
    {name: 'USA', value: 'usa'},
  ];

	ngOnInit(): void {}

	registerForm(form: NgForm) {
		if (!form.valid && form.value.password === form.value.cpassword) {
			return;
		}

		this.authSub = this.authService
			.signup(
				form.value.name,
				form.value.genter,
				form.value.mobile,
				form.value.location,
				form.value.email,
				form.value.password,
				form.value.cpassword,
				form.value.dob
			)
			.subscribe((data) => {
        if(data){
          this.router.navigateByUrl('login');
        }
			});
	}

	ngOnDestroy(): void {
		if (this.authSub) {
			this.authSub.unsubscribe();
		}
	}
}
