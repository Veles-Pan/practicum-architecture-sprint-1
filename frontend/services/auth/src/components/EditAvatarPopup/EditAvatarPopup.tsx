import { PopupWithForm } from "@packages/shared";
import { FC, FormEvent, useRef } from "react";

interface EditAvatarPopupProps {
	isOpen: boolean;
	onUpdateAvatar: (data: { avatar: string }) => void;
	onClose: () => void;
}

export const EditAvatarPopup: FC<EditAvatarPopupProps> = ({ isOpen, onUpdateAvatar, onClose }) => {
	const inputRef = useRef<HTMLInputElement>(null);

	function handleSubmit(e: FormEvent) {
		e.preventDefault();

		if (!inputRef || !inputRef.current) {
			return;
		}

		onUpdateAvatar({
			avatar: inputRef?.current?.value
		});
	}

	return (
		<PopupWithForm
			isOpen={isOpen}
			onSubmit={handleSubmit}
			onClose={onClose}
			title='Обновить аватар'
			name='edit-avatar'
		>
			<label className='popup__label'>
				<input
					type='url'
					name='avatar'
					id='owner-avatar'
					className='popup__input popup__input_type_description'
					placeholder='Ссылка на изображение'
					required
					ref={inputRef}
				/>
				<span className='popup__error' id='owner-avatar-error'></span>
			</label>
		</PopupWithForm>
	);
};

export default EditAvatarPopup;
