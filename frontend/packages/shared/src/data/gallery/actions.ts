import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "../../api";

import { GalleryListState } from "./store";
import { GalleryCardData } from "./types";

export const fetchGalleryCards = createAsyncThunk<GalleryCardData[], void, { state: GalleryListState }>(
	"gallery/fetchGalleryCards",
	async (props, { rejectWithValue, getState, dispatch }) => {
		try {
			const requests = await dispatch(api.getCardList).catch((error) => {
				console.log(error);
				return rejectWithValue("Error with fetching claim data");
			});

			console.log("requests", requests);

			return requests;
		} catch (error) {
			console.log(error);
			return rejectWithValue("Error with fetching request data");
		}
	}
);

export const changeLikeCard = createAsyncThunk<
	boolean,
	{ card: GalleryCardData; isLiked: boolean },
	{ state: GalleryListState }
>("gallery/changeLikeCard", async ({ card, isLiked }, { rejectWithValue, getState, dispatch }) => {
	try {
		const changeLike = await api.changeLikeCardStatus(card._id, !isLiked).catch((error) => {
			console.log(error);
			throw new Error("Error");
		});

		return changeLike;
	} catch (error) {
		console.log(error);
		return rejectWithValue("Error with fetching request data");
	}
});

export const deleteCard = createAsyncThunk<string, GalleryCardData, { state: GalleryListState }>(
	"gallery/deleteCard",
	async (card, { rejectWithValue }) => {
		try {
			await api.removeCard(card._id).catch((error) => {
				console.log(error);
				throw new Error("Error");
			});

			return card._id;
		} catch (error) {
			console.log(error);
			return rejectWithValue("Error with fetching request data");
		}
	}
);

export const addCard = createAsyncThunk<
	GalleryCardData,
	{
		name: string;
		link: string;
	},
	{ state: GalleryListState }
>("gallery/addCard", async (card, { rejectWithValue, getState, dispatch }) => {
	try {
		const addCard = await api.addCard(card).catch((error) => {
			console.log(error);
			throw new Error("Error");
		});

		return addCard;
	} catch (error) {
		console.log(error);
		return rejectWithValue("Error with fetching request data");
	}
});
