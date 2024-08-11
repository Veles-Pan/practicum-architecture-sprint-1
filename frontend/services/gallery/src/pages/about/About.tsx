import { FC, useEffect } from "react";
import { fetchGalleryCards, GalleryListDispatch, getGallery } from "@packages/shared";
import { useDispatch, useSelector } from "react-redux";

export const About: FC = () => {
	const dispatch = useDispatch<GalleryListDispatch>();
	const cards = useSelector(getGallery.selectAll);

	useEffect(() => {
		dispatch(fetchGalleryCards());
	}, [dispatch]);

	return <div>About</div>;
};
