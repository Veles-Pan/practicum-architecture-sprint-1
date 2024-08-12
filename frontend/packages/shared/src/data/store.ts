import { configureStore } from "@reduxjs/toolkit";

import { galleryListSlice } from "./gallery";
import { userListSlice } from "./user";

export const store = configureStore({
	reducer: {
		[galleryListSlice.name]: galleryListSlice.reducer,
		[userListSlice.name]: userListSlice.reducer
	}
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
