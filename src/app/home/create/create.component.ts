import { Subscription } from 'rxjs';
import { AuthService } from './../../Service/auth.service';
import { HomeService } from './../../Service/home.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from 'src/app/Service/post.service';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit,OnDestroy {
  postSub:Subscription | undefined;
  authSub:Subscription | undefined;
  userId:string = ''
	form!: FormGroup;
  imageSrc: string = '';
	constructor(private postService:PostService) {}

	ngOnInit(): void {



    this.form = new FormGroup({
			comment: new FormControl(null, {
				validators: [Validators.required, Validators.minLength(3)]
			}),

			image: new FormControl(null, { validators: [Validators.required] })
		});
	}

	postCreate() {
		if (!this.form.valid) {
			return;
		}

    setTimeout(()=>{
      this.postSub = this.postService.addPost(
        this.form.value.comment,
        // this.form.value.image,
      ).subscribe();
    },100)

	}

	uploadfile(event: any) {
    const reader = new FileReader();


    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageSrc = reader.result as string;

        this.form.patchValue({
          fileSource: reader.result
        });

      };

    }
	}

  ngOnDestroy(): void {
      if(this.postSub )
      {
        this.postSub.unsubscribe()
      }
  }
}
