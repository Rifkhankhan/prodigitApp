import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, switchMap, take, tap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {


  constructor(private http:HttpClient) { }
	private _posts = new BehaviorSubject([]);


  addPost(
		comment: string,
		// image: File,
	) {
		const formData = new FormData();
    // console.log(comment,image);

		// formData.append('image', image);
		formData.append('comment', comment);
		formData.append('userId', '4185161');

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
		return this.http
			.get<any>('http://localhost:3000/api/post/posts')
			.pipe(
				take(1),
				map(data => {
					if (data.message) {
						console.log(data.message);
						return data;
					} else {
						const posts = [];
						console.log(data);

						for (var post of data.posts) {
							posts.push({
								id: post.id,
								comment: post.userComment,
								like: post.like,
								unlike: post.unlike,
								share: post.share,
								// image: post.image,
                date:post.date,
                comments:post.comments
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

  // getPost(id: string) {
	// 	return this.http
	// 		.get<any>('http://localhost:5000/api/crop/cropDisease/' + id)
	// 		.pipe(
	// 			take(1),
	// 			map(data => {
	// 				return {
	// 					diseaseId: data.id,
	// 					diseaseName: data.diseaseName,
	// 					aboutDisease: data.about,
	// 					cropName: data.cropName,
	// 					remedyAction: data.remedyAction,
	// 					image: data.image
	// 				};
	// 			})
	// 		);
	// }

  // CancelPost(id: string) {
	// 	return this.http
	// 		.delete(
	// 			`https://greenproject-6f3b9-default-rtdb.firebaseio.com/cropdisease/${id}.json`
	// 		)
	// 		.pipe(
	// 			take(1),
	// 			switchMap(res => {
	// 				console.log(res);

	// 				return this.AllDiseases;
	// 			}),
	// 			tap(tips => {
	// 				this._cropdiseases.next(tips.filter(p => p.diseaseId !== id));
	// 			})
	// 		);
	// }
}


