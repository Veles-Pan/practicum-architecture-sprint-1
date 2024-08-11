import { createSlice } from "@reduxjs/toolkit";

import { fetchUserData, registerUser, loginUser } from "./actions";
import { UserSchema } from "./types";

const initialState: UserSchema = {
	isLoading: false,
	error: "",
	isLoggedIn: false,
	user: null
};

export const userListSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUserData.pending, (state, action) => {
				state.isLoading = true;
				state.error = undefined;

				state.user = null;
			})
			.addCase(fetchUserData.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = undefined;

				state.user = action.payload[0];
			})
			.addCase(fetchUserData.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
				state.isLoggedIn = false;
			})
			.addCase(registerUser.pending, (state, action) => {
				state.isLoading = true;
				state.error = undefined;

				state.user = null;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = undefined;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
			})
			.addCase(loginUser.pending, (state, action) => {
				state.isLoading = true;
				state.error = undefined;

				state.user = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = undefined;

				state.isLoggedIn = true;
				state.user = action.payload;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
				state.isLoggedIn = false;
			});
	}
});
