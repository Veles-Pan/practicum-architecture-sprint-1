import { configureStore } from "@reduxjs/toolkit";

import { galleryListSlice } from "./slice";

const store = configureStore({
	reducer: {
		[galleryListSlice.name]: galleryListSlice.reducer
	}
});

export type GalleryListState = ReturnType<typeof store.getState>;
export type GalleryListDispatch = typeof store.dispatch;
