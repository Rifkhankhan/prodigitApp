import { Subscription } from 'rxjs';
import { PostService } from 'src/app/Service/post.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
	constructor(private postService: PostService) {}
	isLoading = false;
	postSub: Subscription | undefined;
	posts: any = [];
	ngOnInit(): void {
		this.isLoading = true;
		this.postSub = this.postService.fetchPosts().subscribe(posts => {
			this.posts = posts;
			this.isLoading = false;
		});
	}


	ngOnDestroy(): void {
		if (this.postSub) {
			this.postSub.unsubscribe();
		}
	}
}
