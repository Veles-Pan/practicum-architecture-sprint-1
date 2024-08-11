import React, { FC, PropsWithChildren } from "react";
import { Portal } from "../Portal";

interface PopupWithFormProps {
	title: string;
	name: string;
	isOpen: boolean;
	buttonText?: string;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	onClose: () => void;
}

export const PopupWithForm: FC<PropsWithChildren<PopupWithFormProps>> = ({
	title,
	name,
	isOpen,
	buttonText = "Сохранить",
	onSubmit,
	onClose,
	children
}) => {
	return (
		<Portal>
			<div className={`popup popup_type_${name} ${isOpen ? "popup_is-opened" : ""}`}>
				<div className='popup__content'>
					<form className='popup__form' name={name} noValidate onSubmit={onSubmit}>
						<button type='button' className='popup__close' onClick={onClose}></button>
						<h3 className='popup__title'>{title}</h3>
						{children}
						<button type='submit' className='button popup__button'>
							{buttonText}
						</button>
					</form>
				</div>
			</div>
		</Portal>
	);
};
