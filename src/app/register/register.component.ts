import { Router } from '@angular/router';
import { AuthService } from './../Service/auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {  Subscription } from 'rxjs';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
	constructor(private authService: AuthService, private router: Router) {}
	isLoading = false;
	authSub: Subscription = new Subscription;

	ngOnInit(): void {}

	submitForm(form: NgForm) {
		if (!form.valid) {
			return;
		}

		console.log(form.value);

		this.authenticate(form.value.email, form.value.password);
	}
	authenticate(email: string, password: string) {
		this.isLoading = true;

		this.authSub = this.authService
			.login(email, password)
			.subscribe(resData => {
				this.router.navigateByUrl('/home');
				this.isLoading = false;
			});
	}
	ngOnDestroy(): void {
		if (this.authSub) {
			this.authSub.unsubscribe();
		}
	}
}
