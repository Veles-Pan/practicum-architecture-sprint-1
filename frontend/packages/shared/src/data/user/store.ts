import { configureStore } from "@reduxjs/toolkit";

import { userListSlice } from "./slice";

const store = configureStore({
	reducer: {
		[userListSlice.name]: userListSlice.reducer
	}
});

export type UserListState = ReturnType<typeof store.getState>;
export type UserDispatch = typeof store.dispatch;
