import { useEffect, useState } from "react";

import { Card } from "../Card";
import { fetchGalleryCards, GalleryListDispatch, getGallery, changeLikeCard, deleteCard } from "@packages/shared";
import { useDispatch, useSelector } from "react-redux";

import "./Gallery.css";
import { ImagePopup } from "../ImagePopup";

export const Gallery = () => {
	const dispatch = useDispatch<GalleryListDispatch>();
	const cards = useSelector(getGallery.selectAll);

	const [selectedCard, setSelectedCard] = useState<any>(null);

	useEffect(() => {
		dispatch(fetchGalleryCards());
	}, [dispatch]);

	const handleOpenCardPopup = (card: any) => {
		console.log(card);
		setSelectedCard(card);
	};

	const handleCloseCardPopup = () => {
		setSelectedCard(null);
	};

	const handleCardLike = (card: any) => {
		console.log(card);
		dispatch(changeLikeCard({ card, userId: "123" }));
	};

	const handleCardDelete = (card: any) => {
		dispatch(deleteCard(card));
	};

	console.log("cards", cards);

	return (
		<>
			<section className='places page__section'>
				<ul className='places__list'>
					{cards.map((card) => (
						<Card
							key={card._id}
							card={card}
							onCardClick={handleOpenCardPopup}
							onCardLike={handleCardLike}
							onCardDelete={handleCardDelete}
						/>
					))}
				</ul>
			</section>
			<ImagePopup card={selectedCard} onClose={handleCloseCardPopup} />
		</>
	);
};
