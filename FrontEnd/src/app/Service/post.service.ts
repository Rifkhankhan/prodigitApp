import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, of, switchMap, take, tap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class PostService {
	constructor(private http: HttpClient) {}
	private _posts = new BehaviorSubject([]);

	addPost(comment: string, image: File, userId: string) {
		const formData = new FormData();
		// console.log(comment, image);

		formData.append('image', image);
		formData.append('comment', comment);
		formData.append('userId', userId);

		return this.http
			.post<any>('http://localhost:3000/api/post/create', formData)
			.pipe(
				take(1),
				switchMap(data => {
					return this.Posts;
				}),
				tap(posts => {
					this._posts.next(posts);
				})
			);
	}

	get Posts() {
		return this._posts.asObservable();
	}

	fetchPosts() {
		return this.http.get<any>('http://localhost:3000/api/post/posts').pipe(
			take(1),
			map(data => {
				if (data.message) {
					console.log(data.message);
					return data;
				} else {
					const posts = [];

					for (var post of data.posts) {
						posts.push({
							id: post.id,
							comment: post.userComment,
							like: post.like,
							dislike: post.dislike,
							share: post.share,
							image: post.image,
							date: post.date,
							comments: post.comments,
							commentCount: post.commentCount
						});
					}

					return posts;
				}
			}),
			tap(data => {
				this._posts.next(data);
			})
		);
	}

	updatePost(id: string, type: string) {
		const data = { id: id, type: type };
		let updateposts: any = [];
		return this.http
			.patch<any>('http://localhost:3000/api/post/updatePostById', data)
			.pipe(
				take(1),
				switchMap(posts => {
					updateposts = posts;

					return this.Posts;
				}),
				tap(posts => {
					this._posts.next(updateposts);
				})
			);
	}
}
