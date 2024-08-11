import { PopupWithForm } from "@packages/shared";
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";

interface PopupWithFormProps {
	isOpen: boolean;
	onUpdateUser: (data: { name: string; about: string }) => void;
	onClose: () => void;
	currentUser: {
		name: string;
		about: string;
	};
}

export const EditProfilePopup: FC<PopupWithFormProps> = ({ isOpen, onUpdateUser, onClose, currentUser }) => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
		setName(e.target.value);
	}

	function handleDescriptionChange(e: ChangeEvent<HTMLInputElement>) {
		setDescription(e.target.value);
	}

	useEffect(() => {
		if (currentUser) {
			setName(currentUser.name);
			setDescription(currentUser.about);
		}
	}, [currentUser]);

	function handleSubmit(e: FormEvent) {
		e.preventDefault();

		onUpdateUser({
			name,
			about: description
		});
	}

	return (
		<PopupWithForm
			isOpen={isOpen}
			onSubmit={handleSubmit}
			onClose={onClose}
			title='Редактировать профиль'
			name='edit'
		>
			<label className='popup__label'>
				<input
					type='text'
					name='userName'
					id='owner-name'
					className='popup__input popup__input_type_name'
					placeholder='Имя'
					required
					minLength={2}
					maxLength={40}
					pattern='[a-zA-Zа-яА-Я -]{1,}'
					value={name || ""}
					onChange={handleNameChange}
				/>
				<span className='popup__error' id='owner-name-error'></span>
			</label>
			<label className='popup__label'>
				<input
					type='text'
					name='userDescription'
					id='owner-description'
					className='popup__input popup__input_type_description'
					placeholder='Занятие'
					required
					minLength={2}
					maxLength={200}
					value={description || ""}
					onChange={handleDescriptionChange}
				/>
				<span className='popup__error' id='owner-description-error'></span>
			</label>
		</PopupWithForm>
	);
};

export default EditProfilePopup;
