export type UserData = {
	about: string;
	avatar: string;
	cohort: string;
	name: string;
	_id: string;
	token: string;
};

export interface UserSchema {
	isLoading: boolean;
	error?: string;
	isLoggedIn: boolean;
	user?: UserData;
	email: string;
	jwt?: string;
}
