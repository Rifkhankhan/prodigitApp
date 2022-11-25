export class User {
	constructor(
		public name: string,
		public userId: string,
		private _token: string, // private tokenExpirationDate: Date
		private tokenExpirationDate: Date
	) {}

	get token() {
		if (!this.tokenExpirationDate || this.tokenExpirationDate <= new Date()) {
			return null;
		}
		return this._token;
	}
}
