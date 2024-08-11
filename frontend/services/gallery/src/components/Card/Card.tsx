import React, { FC } from "react";

import { useSelector } from "react-redux";
import { getUser } from "@packages/shared";

interface CardProps {
	card: any;
	onCardClick: (card: any) => void;
	onCardLike: (card: any) => void;
	onCardDelete: (card: any) => void;
}

export const Card: FC<CardProps> = ({ card, onCardClick, onCardLike, onCardDelete }) => {
	const cardStyle = { backgroundImage: `url(${card.link})` };

	function handleClick() {
		onCardClick(card);
	}

	function handleLikeClick() {
		onCardLike(card);
	}

	function handleDeleteClick() {
		onCardDelete(card);
	}

	const currentUser = useSelector(getUser);

	const isLiked = card.likes.some((i: any) => i._id === currentUser?._id);
	const cardLikeButtonClassName = `card__like-button ${isLiked && "card__like-button_is-active"}`;

	const isOwn = card.owner._id === currentUser?._id;
	const cardDeleteButtonClassName = `card__delete-button ${
		isOwn ? "card__delete-button_visible" : "card__delete-button_hidden"
	}`;

	return (
		<li className='places__item card'>
			<div className='card__image' style={cardStyle} onClick={handleClick}></div>
			<button type='button' className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
			<div className='card__description'>
				<h2 className='card__title'>{card.name}</h2>
				<div className='card__likes'>
					<button type='button' className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
					<p className='card__like-count'>{card.likes.length}</p>
				</div>
			</div>
		</li>
	);
};
