class Api {
	private _token: string;
	private _groupId: string;
	private _address: string;

	constructor({ address, token, groupId }: { address: string; token: string; groupId: string }) {
		this._token = token;
		this._groupId = groupId;
		this._address = address;
	}

	getAppInfo() {
		return Promise.all([this.getCardList(), this.getUserInfo()]);
	}

	getCardList = () => {
		return fetch(`${this._address}/${this._groupId}/cards`, {
			headers: {
				authorization: this._token
			}
		}).then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
	};

	addCard = ({ name, link }: { name: string; link: string }) => {
		return fetch(`${this._address}/${this._groupId}/cards`, {
			method: "POST",
			headers: {
				authorization: this._token,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				name,
				link
			})
		}).then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
	};

	removeCard = (cardID: string) => {
		return fetch(`${this._address}/${this._groupId}/cards/${cardID}`, {
			method: "DELETE",
			headers: {
				authorization: this._token
			}
		}).then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
	};

	getUserInfo = () => {
		return fetch(`${this._address}/${this._groupId}/users/me`, {
			headers: {
				authorization: this._token
			}
		}).then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
	};

	setUserInfo = ({ name, about }: { name: string; about: string }) => {
		return fetch(`${this._address}/${this._groupId}/users/me`, {
			method: "PATCH",
			headers: {
				authorization: this._token,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				name,
				about
			})
		}).then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
	};

	setUserAvatar = ({ avatar }: { avatar: string }) => {
		return fetch(`${this._address}/${this._groupId}/users/me/avatar`, {
			method: "PATCH",
			headers: {
				authorization: this._token,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				avatar
			})
		}).then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
	};

	changeLikeCardStatus = (cardID: string, like: boolean) => {
		// Обычная реализация: 2 разных метода для удаления и постановки лайка.
		return fetch(`${this._address}/${this._groupId}/cards/like/${cardID}`, {
			method: like ? "PUT" : "DELETE",
			headers: {
				authorization: this._token,
				"Content-Type": "application/json"
			}
		}).then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
	};
}

export const api = new Api({
	address: "https://nomoreparties.co",
	groupId: `cohort0`,
	token: `80a75492-21c5-4330-a02f-308029e94b63`
});
