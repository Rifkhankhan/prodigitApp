import { AuthService } from './../../Service/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
	constructor(
		private authService: AuthService,
		private route: ActivatedRoute
	) {}
	isLoading = false;
	authSub: Subscription = new Subscription();
	paraSub: Subscription = new Subscription();
	userData: any;
	ngOnInit(): void {
		this.paraSub = this.route.paramMap.subscribe(paramMap => {
			this.isLoading = true;
			if (!paramMap.has('id')) {
				return;
			}

			this.authSub = this.authService
				.getUser(paramMap.get('id')!)
				.subscribe(tip => {
					this.userData = tip;
					this.isLoading = false;
				});
		});
	}

	ngOnDestroy(): void {
		if (this.authSub || this.paraSub) {
			this.paraSub.unsubscribe();
			this.authSub.unsubscribe();
		}
	}
}
