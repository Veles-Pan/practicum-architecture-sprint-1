import { FC, useState } from "react";
import { AddCardPopup } from "../AddCardPopup";
import { useDispatch } from "react-redux";
import { GalleryListDispatch, addCard } from "@packages/shared";

export const AddCard: FC = () => {
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const dispatch = useDispatch<GalleryListDispatch>();

	const onAddPlace = () => {
		setIsPopupOpen(true);
	};

	const onClose = () => {
		setIsPopupOpen(false);
	};

	const handleAddCard = (data: { name: string; link: string }) => {
		dispatch(addCard(data));
		onClose();
	};

	return (
		<>
			<button className='profile__add-button' type='button' onClick={onAddPlace}></button>
			<AddCardPopup isOpen={isPopupOpen} onClose={onClose} onAddCard={handleAddCard} />
		</>
	);
};
