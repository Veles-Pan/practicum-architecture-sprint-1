import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { addCard, deleteCard, fetchGalleryCards } from "./actions";
import { GalleryListState } from "./store";
import { GalleryCardData, GallerySchema } from "./types";

const initialState: GallerySchema = {
	isLoading: false,
	error: "",
	ids: [],
	entities: {}
};

//@ts-expect-error
const galleryAdapter = createEntityAdapter<GalleryCardData>({
	selectId: (request) => request._id
});

export const getGallery = galleryAdapter.getSelectors<GalleryListState>(
	(state) => state.gallery || galleryAdapter.getInitialState()
);

export const galleryListSlice = createSlice({
	name: "gallery",
	initialState: galleryAdapter.getInitialState<GallerySchema>(initialState),
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchGalleryCards.pending, (state, action) => {
				state.isLoading = true;
				state.error = undefined;

				galleryAdapter.removeAll(state);
			})
			.addCase(fetchGalleryCards.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = undefined;

				galleryAdapter.setAll(state, action.payload);
			})
			.addCase(fetchGalleryCards.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
			})
			.addCase(addCard.pending, (state, action) => {
				state.isLoading = true;
				state.error = undefined;
			})
			.addCase(addCard.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = undefined;

				galleryAdapter.addOne(state, action.payload);
			})
			.addCase(addCard.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
			})
			.addCase(deleteCard.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = undefined;

				galleryAdapter.removeOne(state, action.payload);
			});
	}
});
