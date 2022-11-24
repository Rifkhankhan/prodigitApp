import { Subscription } from 'rxjs';
import { AuthService } from './../Service/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
	constructor(private authService: AuthService) {}

	isLoading = false;
	authSub: Subscription = new Subscription();
	userData: any;
	ngOnInit(): void {
		this.isLoading = true;


		this.authSub = this.authService
			.getUser(JSON.parse(String(localStorage.getItem('data'))).data.userId)
			.subscribe((data) => {
        this.userData = data;
				this.isLoading = false;
			});
	}

	ngOnDestroy(): void {
		if (this.authSub) {
			this.authSub.unsubscribe();
		}
	}
}
