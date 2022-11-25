import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  constructor(private authService: AuthService, private router: Router) {}
	isLoading = false;
	authSub: Subscription = new Subscription();

	ngOnInit(): void {}

	submitform(form:NgForm) {
		if (!form.valid) {
      console.log('not');

			return;
		}

		this.authSub = this.authService
			.login(form.value.email, form.value.password)
			.subscribe(data => {
				if (localStorage.getItem('data')) {
					this.router.navigateByUrl('/home');
				}
			});
	}

	ngOnDestroy(): void {
		if (this.authSub) {
			this.authSub.unsubscribe();
		}
	}
}
