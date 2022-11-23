import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
	form: FormGroup;
	imagePreview: string;

	constructor() {}

	ngOnInit(): void {
		this.form = new FormGroup({
			comment: new FormControl(null, {
				validators: [Validators.required, Validators.minLength(3)]
			}),

			image: new FormControl(null, { validators: [Validators.required] })
		});
	}

	postCreate(form: NgForm) {
		if (!form.valid) {
			return;
		}

		console.log(form.value);
	}

	uploadfile(event: Event) {
		const file = (event.target as HTMLInputElement).files[0];
		this.form.patchValue({ image: file });
		this.form.get('image').updateValueAndValidity();
		const reader = new FileReader();
		reader.onload = () => {
			this.imagePreview = reader.result as string;
		};

		reader.readAsDataURL(file);
	}
}
