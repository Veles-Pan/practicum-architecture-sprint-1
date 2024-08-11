class Auth {
	private _baseUrl: string;

	constructor(baseUrl: string) {
		this._baseUrl = baseUrl;
	}

	register = (email: string, password: string) => {
		return fetch(`${this._baseUrl}/signup`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ email, password })
		}).then(this._getResponse);
	};

	login = (email: string, password: string) => {
		return fetch(`${this._baseUrl}/signin`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ email, password })
		})
			.then(this._getResponse)
			.then((data) => {
				localStorage.setItem("jwt", data.token);
				return data;
			});
	};

	checkToken = (token: string) => {
		return fetch(`${this._baseUrl}/users/me`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			}
		}).then(this._getResponse);
	};

	private _getResponse = (res: Response) => {
		return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
	};
}

export const auth = new Auth("https://auth.nomoreparties.co");
