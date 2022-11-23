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

	login(email: string, password: string) {
		const data = { email: email, password: password };

		return this.http
			.post<any>('http://localhost:5000/api/auth/SignIn', data)
			.pipe(tap(this.setUserData.bind(this)));
	}

	logout() {
		this._user.next(null!);

		localStorage.removeItem('key');
	}

	signup(
		name: string,
		genter: string,
		mobile: string,
		location: string,
		email: string,
		password: string,
		cpassword: string
	) {
		const newuser = {
			name: name,
			genter: genter,
			mobile: mobile,
			location: location,
			email: email,
			password: password,
			cpassword: cpassword
		};

		return this.http
			.post<AuthResponseData>('http://localhost:5000/api/auth/SignUp', newuser)
			.pipe(tap(this.setUserData.bind(this)));
	}

	private storeAuthData(
		name: string,
		userId: string,
		token: string,
		tokenExpirationDate: string
	) {
		const data = JSON.stringify({
			name: name,
			localId: userId,
			idToken: token,
			tokenExpirationDate: tokenExpirationDate
		});

		// localStorage.setItem('data', data);
		// Preferences.Storage.set({ key: 'authData', value: data });
		localStorage.setItem('key', data);
	}

	private setUserData(userData: AuthResponseData) {
		const expirationTime = new Date(new Date().getTime() + +3600 * 1000);

		this._user.next(
			new User(
				userData.name,
				userData.userId,
				userData.token,
				expirationTime
			)
		);

		this.storeAuthData(
			userData.name,
			userData.userId,
			userData.token,
			expirationTime.toISOString()
		);
	}

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
