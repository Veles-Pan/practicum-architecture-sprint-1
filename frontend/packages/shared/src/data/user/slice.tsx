import { createSlice } from "@reduxjs/toolkit";
import { fetchUserData, registerUser, loginUser, updateAvatar, updateUser, checkToken } from "./actions";
import { UserSchema } from "./types";

const loadUserFromLocalStorage = (): UserSchema => {
	const userData = localStorage.getItem("user");

	const jwt = localStorage.getItem("jwt");

	if (!!userData && !!jwt) {
		console.log("object");
		return {
			isLoading: false,
			error: "",
			isLoggedIn: true,
			user: JSON.parse(userData),
			email: "",
			jwt: jwt
		};
	} else if (jwt) {
		return {
			isLoading: false,
			error: "",
			isLoggedIn: true,
			user: null,
			email: "",
			jwt: jwt
		};
	}

	return {
		isLoading: false,
		error: "",
		isLoggedIn: false,
		user: null,
		email: "",
		jwt: ""
	};
};

// Инициализация состояния с проверкой localStorage
const initialState: UserSchema = loadUserFromLocalStorage();

export const userListSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {
		logout: (state) => {
			state.isLoggedIn = false;
			state.user = null;
			state.jwt = "";
			state.email = "";
			localStorage.removeItem("user");
			localStorage.removeItem("jwt");
		}
	},
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

				state.user = action.payload;
				localStorage.setItem("user", JSON.stringify(state.user));
			})
			.addCase(fetchUserData.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
				state.isLoggedIn = false;
				localStorage.removeItem("user");
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
				state.jwt = "";
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = undefined;

				state.isLoggedIn = true;
				state.jwt = action.payload;

				localStorage.setItem("jwt", action.payload);
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
				state.isLoggedIn = false;

				localStorage.removeItem("jwt");
				localStorage.removeItem("user");
			})

			.addCase(updateAvatar.fulfilled, (state, action) => {
				state.user = action.payload;
				localStorage.setItem("user", JSON.stringify(state.user));
			})

			.addCase(updateUser.fulfilled, (state, action) => {
				state.user = action.payload;
				localStorage.setItem("user", JSON.stringify(state.user));
			})

			.addCase(checkToken.fulfilled, (state, action) => {
				state.isLoggedIn = true;
				state.email = action.payload;
			})
			.addCase(checkToken.rejected, (state, action) => {
				state.isLoggedIn = false;

				localStorage.removeItem("jwt");
				localStorage.removeItem("user");
			});
	}
});

// Экспортируем action для logout
export const { logout } = userListSlice.actions;
