import { NgForm } from '@angular/forms';
import { AuthService } from './../../Service/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
	constructor(
		private authService: AuthService,
		private route: ActivatedRoute
	) {}
	isLoading = false;
	authSub: Subscription = new Subscription();
	paraSub: Subscription = new Subscription();
	userPassword: any;
	userData: any;
	ngOnInit(): void {
		// this.isLoading = true;

		this.userData = JSON.parse(
			String(localStorage.getItem('data'))
		).data.userId;
	}

	resetPassword(form: NgForm) {
		if (!form.valid) {
			return;
		}

		this.paraSub = this.authService
			.updatePassword(form.value.old, form.value.new, this.userData)
			.subscribe();
	}

	ngOnDestroy(): void {
		if (this.paraSub) {
			this.paraSub.unsubscribe();
		}
	}
}
