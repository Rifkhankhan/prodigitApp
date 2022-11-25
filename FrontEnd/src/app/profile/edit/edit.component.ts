import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../../Service/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
	constructor(
		private authService: AuthService,
		private route: ActivatedRoute,
    private router:Router
	) {}
	isLoading = false;
	authSub: Subscription = new Subscription();
	paraSub: Subscription = new Subscription();
	submitSub: Subscription = new Subscription();
	userData: any;
  form!:FormGroup
  imageSrc: string = '';

	ngOnInit(): void {

    this.isLoading = true
			this.authSub = this.authService
				.getUser(JSON.parse(String(localStorage.getItem('data'))).data.userId)
				.subscribe(tip => {
					this.userData = tip;
          console.log(this.userData);

          this.form = new FormGroup({

            name: new FormControl(this.userData.name, {
              validators: [Validators.required, Validators.minLength(3)]
            }),

            genter: new FormControl(this.userData.genter, { validators: [Validators.required] }),
            mobile: new FormControl(this.userData.mobile, { validators: [Validators.required] }),
            dob: new FormControl(this.userData.dob, { validators: [Validators.required] }),
            location: new FormControl(this.userData.location, { validators: [Validators.required] }),
            email: new FormControl(this.userData.email, { validators: [Validators.required] }),
            image: new FormControl(this.userData.image, { validators: [Validators.required] }),
          });
            this.isLoading = false;
				});
	}

  uploadfile(event: any) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
		  this.form.get('image')!.updateValueAndValidity();

      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.form.patchValue({
          image: file
        });
      };
    }
	}

  submitForm(){
    if(!this.form.valid)
    {
      console.log('not');

      return
    }

    this.submitSub = this.authService.updateProfile(
      this.form.value.name,
      this.form.value.genter,
      this.form.value.mobile,
      this.form.value.dob,
      this.form.value.location,
      this.form.value.email,

     JSON.parse(String(localStorage.getItem('data'))).data.userId,
     this.form.value.image
    ).subscribe(()=>{
      this.router.navigateByUrl('/profile')
    })


  }

	ngOnDestroy(): void {
		if (this.authSub || this.paraSub || this.submitSub) {
			this.paraSub.unsubscribe();
			this.authSub.unsubscribe();
			this.submitSub.unsubscribe();
		}
	}
}
