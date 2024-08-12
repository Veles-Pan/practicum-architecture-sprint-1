import { EntityState } from "@reduxjs/toolkit";

export type GalleryCardData = {
	createdAt: Date;
	_id: string;
	name: string;
	link: string;
	likes: {
		name: string;
		about: string;
		_id: string;
	}[];
	owner: {
		about: string;
		avatar: string;
		cohort: string;
		name: string;
		_id: string;
	};
};

export interface GallerySchema extends EntityState<GalleryCardData, string> {
	isLoading: boolean;
	error?: string;
}
