import { createAsyncThunk } from "@reduxjs/toolkit";

import { api, auth } from "../../api";

import { UserListState } from "./store";
import { UserData } from "./types";
import { getToken } from "./selectors";

export const fetchUserData = createAsyncThunk<UserData, void, { state: UserListState }>(
	"user/fetchUserData",
	async (props, { getState }) => {
		try {
			const user = await api.getUserInfo().catch((error) => {
				console.log(error);
				throw new Error("Error");
			});

			return user;
		} catch (error) {
			console.log(error);
			throw new Error("Error");
		}
	}
);
export const registerUser = createAsyncThunk<void, { email: string; password: string }, { state: UserListState }>(
	"user/registerUser",
	async ({ email, password }) => {
		try {
			const user = await auth.register(email, password).catch((error) => {
				throw new Error("Error");
			});

			return user;
		} catch (error) {
			console.log(error);
			throw new Error("Error");
		}
	}
);

export const loginUser = createAsyncThunk<string, { email: string; password: string }, { state: UserListState }>(
	"user/loginUser",
	async ({ email, password }) => {
		try {
			const token = await auth.login(email, password).catch(() => {
				throw new Error("Error");
			});

			console.log("token", token);

			return token.token;
		} catch (error) {
			throw new Error("Error");
		}
	}
);

export const checkToken = createAsyncThunk<string, void, { state: UserListState }>(
	"user/checkToken",
	async (token, { getState }) => {
		try {
			const token = getToken(getState()) || localStorage.getItem("jwt");

			const user = await auth.checkToken(token).catch(() => {
				throw new Error("Error");
			});

			return user.data.email;
		} catch (error) {
			throw new Error("Error");
		}
	}
);

export const updateAvatar = createAsyncThunk<UserData, { avatar: string }, { state: UserListState }>(
	"user/updateAvatar",
	async ({ avatar }) => {
		try {
			const response = await api.setUserAvatar({ avatar }).catch(() => {
				throw new Error("Error");
			});

			console.log("response", response);

			return response;
		} catch (error) {
			throw new Error("Error");
		}
	}
);

export const updateUser = createAsyncThunk<UserData, { name: string; about: string }, { state: UserListState }>(
	"user/updateUser",
	async ({ name, about }) => {
		try {
			const response = await api.setUserInfo({ name, about }).catch(() => {
				throw new Error("Error");
			});

			console.log("response", response);

			return response;
		} catch (error) {
			throw new Error("Error");
		}
	}
);
