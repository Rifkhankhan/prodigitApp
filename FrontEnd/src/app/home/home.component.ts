import { Subscription } from 'rxjs';
import { PostService } from 'src/app/Service/post.service';
import {
	Component,
	OnInit,
	OnDestroy,
	OnChanges,
	SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
	constructor(private postService: PostService) {}
	isLoading = false;
	postSub: Subscription = new Subscription();
	actionSub: Subscription = new Subscription();
	doSub: Subscription = new Subscription();
	posts: any = [];


  ngOnInit() {
		this.isLoading = true;
    console.log(this.isLoading);

		this.postSub = this.postService.fetchPosts().subscribe(posts => {
			if (posts.message) {
				this.posts = [];
			} else {
				this.posts = posts;
			}
      this.isLoading = false;

      console.log(posts);


		});
	}

  // ngAfterViewChecked(): void {
  //   this.isLoading = true;
	// 	this.postSub = this.postService.fetchPosts().subscribe(posts => {
	// 		if (posts.message) {
	// 			this.posts = [];
	// 		} else {
	// 			this.posts = posts;
	// 		}
  //     this.isLoading = false;
	// 	});

  // }





	postLike(id: string) {
		console.log(id);

		this.actionSub = this.postService.updatePost(id, 'like').subscribe();
	}
	postUnlike(id: string) {
		this.actionSub = this.postService.updatePost(id, 'dislike').subscribe();
	}
	postComment(id: string) {
		this.actionSub = this.postService
			.updatePost(id, 'commentCount')
			.subscribe();
	}
	postShare(id: string) {
		this.actionSub = this.postService.updatePost(id, 'share').subscribe();
	}

	ngOnDestroy(): void {
		if (this.postSub || this.actionSub || this.doSub) {
			this.postSub.unsubscribe();
			this.actionSub.unsubscribe();
			this.doSub.unsubscribe();
		}
	}
}
