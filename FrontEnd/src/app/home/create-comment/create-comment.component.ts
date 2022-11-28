import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './../../Service/auth.service';
import { HomeService } from './../../Service/home.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { PostService } from 'src/app/Service/post.service';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit,OnDestroy {
  postSub:Subscription = new Subscription;
  authSub:Subscription = new Subscription;
  paraSub:Subscription = new Subscription;
  commentId!: any;
	form!: FormGroup;
  imageSrc: string = '';

	constructor(private postService:PostService,private routre:Router,
    private route:ActivatedRoute) {}


  ngOnInit(): void {
    this.paraSub = this.route.paramMap.subscribe(paramMap=>{
      if(!paramMap.has('id')){
        return
      }

      this.commentId = paramMap.get('id');

      this.form = new FormGroup({
        comment: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(5)]
        }),
      });

      this.form.reset()
    })
  }

  createComment(){
    if (!this.form.valid) {
			return;
		}

    this.authSub = this.postService.addComment(this.form.value.comment,this.commentId).subscribe(()=>{
      this.routre.navigateByUrl('/home')
    })
  }
  ngOnDestroy(): void {
    if(this.authSub ||this.paraSub)
    {
      this.authSub.unsubscribe()
      this.paraSub.unsubscribe()
    }
}
}
