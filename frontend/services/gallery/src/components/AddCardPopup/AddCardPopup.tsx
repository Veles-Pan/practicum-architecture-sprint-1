import { PopupWithForm } from "@packages/shared";
import React, { ChangeEvent, FC, FormEvent, useState } from "react";

interface AddCardPopupProps {
	isOpen: boolean;
	onAddCard: (data: { name: string; link: string }) => void;
	onClose: () => void;
}

export const AddCardPopup: FC<AddCardPopupProps> = ({ isOpen, onAddCard, onClose }) => {
	const [name, setName] = useState("");
	const [link, setLink] = useState("");

	function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
		setName(e.target.value);
	}

	function handleLinkChange(e: ChangeEvent<HTMLInputElement>) {
		setLink(e.target.value);
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		onAddCard({
			name,
			link
		});
	}

	return (
		<PopupWithForm isOpen={isOpen} onSubmit={handleSubmit} onClose={onClose} title='Новое место' name='new-card'>
			<label className='popup__label'>
				<input
					type='text'
					name='name'
					id='place-name'
					className='popup__input popup__input_type_card-name'
					placeholder='Название'
					required
					minLength={1}
					maxLength={30}
					value={name}
					onChange={handleNameChange}
				/>
				<span className='popup__error' id='place-name-error'></span>
			</label>
			<label className='popup__label'>
				<input
					type='url'
					name='link'
					id='place-link'
					className='popup__input popup__input_type_url'
					placeholder='Ссылка на картинку'
					required
					value={link}
					onChange={handleLinkChange}
				/>
				<span className='popup__error' id='place-link-error'></span>
			</label>
		</PopupWithForm>
	);
};
