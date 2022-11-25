import { User } from './../Models/user.model';
import { Users } from './../Models/users.models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
export interface AuthResponseData {
	expiredIn: String;
	userId: string;
	name: string;
	token: string;
}
@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private http: HttpClient) {}

	private _user = new BehaviorSubject<User>(null!);
	private _users = new BehaviorSubject<any>(null!);

  get getUsers()
  {
    return this._user.asObservable();
  }

  get user()
  {
    return this._users.asObservable()
  }

	get isAuthenticated() {
		return this._user.asObservable().pipe(
			map(user => {
				if (user) {
					return !!user.token;
				} else {
					return false;
				}
			})
		);
	}

	get getUserId() {
		return this._user.asObservable().pipe(
			map(user => {
				if (user) {
					return user.userId;
				} else {
					return null;
				}
			})
		);
	}

	getUser(id: string) {
		return this.http
			.get<any>('http://localhost:3000/api/auth/getUser/' + id)
			.pipe(
				take(1),
				map(data => {
					return {
						id: data.id,
						name: data.name,
						genter: data.genter,
						dob: data.dob,
						mobile: data.mobile,
						email: data.email,
						location: data.location,
            image:data.image
					};
				})
			);
	}

	getUserPassword(id: string) {
		return this.http
			.get<any>('http://localhost:3000/api/auth/getUserPassword/' + id)
			.pipe(
				take(1),
				map(data => {

					return {
						id: data.id,
						password: data.password
					};
				})
			);
	}

	updatePassword(oldPassword: string, newPassword: string,id:string) {
		const passwords = {
			currentPassword: oldPassword,
			newPassword: newPassword,
      userId:id
		};

		return this.http
			.patch<any>('http://localhost:3000/api/auth/updatePassword', passwords)
			.pipe(
				take(1),
				map(data => {
					console.log(data);

					return {
						id: data.id,
						password: data.password
					};
				})
			);
	}


  updateProfile(
    name:string,
    genter:string,
    mobile:string,
    dob:string,
    location:string,
    email:string,
    userId:string,
    image:File
  ) {


    const formData = new FormData();

    formData.append('image',image);
    formData.append('name',name);
    formData.append('genter',genter);
    formData.append('dob',dob);
    formData.append('location',location);
    formData.append('email',email);
    formData.append('userId',userId);
    formData.append('mobile',mobile);

		return this.http
			.patch<any>('http://localhost:3000/api/auth/updateProfile', formData)
			.pipe(
				take(1),
        tap(data=>{
          this._users.next(data)
        })
			);
	}

	login(email: string, password: string) {
		const data = { email: email, password: password };

		return this.http
			.post<any>('http://localhost:3000/api/auth/SignIn', data)
			.pipe(
				tap(data => {
					const expirationTime = new Date(new Date().getTime() + +3600 * 1000);
					localStorage.setItem('data', JSON.stringify(data));

					this._user.next(
						new User(data.name, data.userId, data.token, expirationTime)
					);
				})
			);
	}

	logout() {
		this._user.next(null!);

		localStorage.removeItem('data');
	}

	signup(
		name: string,
		genter: string,
		mobile: string,
		location: string,
		email: string,
		password: string,
		cpassword: string,
		dob: string
	) {
		const newuser = {
			name: name,
			genter: genter,
			mobile: mobile,
			location: location,
			email: email,
			password: password,
			dob: dob
		};

		return this.http
			.post<any>('http://localhost:3000/api/auth/SignUp', newuser)
			.pipe(
				map(data => {

          console.log(data.message);

          return data.message;
					// const expirationTime = new Date(new Date().getTime() + +3600 * 1000);
					// localStorage.setItem('data', JSON.stringify(data));

					// this._user.next(
					// 	new User(data.name, data.userId, data.token, expirationTime)
					// );
				})
			);
	}

	// private storeAuthData(
	// 	name: string,
	// 	userId: string,
	// 	token: string,
	// 	tokenExpirationDate: string
	// ) {
	// 	const data = JSON.stringify({
	// 		name: name,
	// 		localId: userId,
	// 		idToken: token,
	// 		tokenExpirationDate: tokenExpirationDate
	// 	});

	// 	// localStorage.setItem('data', data);
	// 	// Preferences.Storage.set({ key: 'authData', value: data });
	// 	localStorage.setItem('key', data);
	// }

	// private setUserData(userData: AuthResponseData) {
	// 	const expirationTime = new Date(new Date().getTime() + +3600 * 1000);

	// 	this._user.next(
	// 		new User(userData.name, userData.userId, userData.token, expirationTime)
	// 	);

	// 	this.storeAuthData(
	// 		userData.name,
	// 		userData.userId,
	// 		userData.token,
	// 		expirationTime.toISOString()
	// 	);
	// }

	// autoLogin() {
	// 	return from(Preferences.get({ key: 'userData' })).pipe(
	// 		map(storeData => {
	// 			if (!storeData || !storeData.value) {
	// 				return null;
	// 			}

	// 			const parsedData = JSON.parse(storeData.value) as {
	// 				localId: string;
	// 				idToken: string;
	// 				role: string;
	// 				username: string;
	// 				tokenExpirationDate: string;
	// 			};

	// 			const expirationTime = new Date(parsedData.tokenExpirationDate);

	// 			if (expirationTime <= new Date()) {
	// 				return null;
	// 			}

	// 			const user = new User(
	// 				parsedData.role,
	// 				parsedData.localId,
	// 				parsedData.username,
	// 				parsedData.idToken,
	// 				expirationTime
	// 			);

	// 			return user;
	// 		}),
	// 		tap(user => {
	// 			this._user.next(user);
	// 		}),
	// 		map(user => {
	// 			return !!user;
	// 		})
	// 	);
	// }
}
