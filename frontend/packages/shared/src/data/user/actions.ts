import { createAsyncThunk } from "@reduxjs/toolkit";

import { api, auth } from "../../api";

import { UserListState } from "./store";
import { UserData } from "./types";

export const fetchUserData = createAsyncThunk<UserData[], void, { state: UserListState }>(
	"user/fetchUserData",
	async (props, { rejectWithValue, getState, dispatch }) => {
		try {
			const user = await dispatch(api.getUserInfo).catch((error) => {
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
	async ({ email, password }, { rejectWithValue, getState, dispatch }) => {
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

export const loginUser = createAsyncThunk<UserData, { email: string; password: string }, { state: UserListState }>(
	"user/loginUser",
	async ({ email, password }, { rejectWithValue, getState, dispatch }) => {
		try {
			const token = await auth.login(email, password).catch(() => {
				throw new Error("Error");
			});

			const user = await auth.checkToken(token.token).catch(() => {
				throw new Error("Error");
			});

			return user.data;
		} catch (error) {
			throw new Error("Error");
		}
	}
);
