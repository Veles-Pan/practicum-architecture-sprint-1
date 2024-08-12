import { FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "@packages/shared";

interface CardProps {
	card: any;
	onCardClick: (card: any) => void;
	onCardDelete: (card: any) => void;
	onCardLike: (card: any, isLiked: boolean) => void;
}

export const Card: FC<CardProps> = ({ card, onCardClick, onCardDelete, onCardLike }) => {
	const currentUser = useSelector(getUser);
	const [likeCount, setLikeCount] = useState(card.likes.length);
	const [isLiked, setIsLiked] = useState(card.likes.some((i: any) => i._id === currentUser?._id));

	const cardStyle = { backgroundImage: `url(${card.link})` };

	function handleClick() {
		onCardClick(card);
	}

	function handleLikeClick() {
		const updatedIsLiked = !isLiked;
		const updatedLikeCount = updatedIsLiked ? likeCount + 1 : likeCount - 1;

		setIsLiked(updatedIsLiked);
		setLikeCount(updatedLikeCount);
		onCardLike(card, isLiked);
	}

	function handleDeleteClick() {
		onCardDelete(card);
	}

	const isOwn = card.owner._id === currentUser?._id;
	const cardDeleteButtonClassName = `card__delete-button ${
		isOwn ? "card__delete-button_visible" : "card__delete-button_hidden"
	}`;
	const cardLikeButtonClassName = `card__like-button ${isLiked ? "card__like-button_is-active" : ""}`;

	return (
		<li className='places__item card'>
			<div className='card__image' style={cardStyle} onClick={handleClick}></div>
			<button type='button' className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
			<div className='card__description'>
				<h2 className='card__title'>{card.name}</h2>
				<div className='card__likes'>
					<button type='button' className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
					<p className='card__like-count'>{likeCount}</p>
				</div>
			</div>
		</li>
	);
};
