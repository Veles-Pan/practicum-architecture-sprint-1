import React, { FC } from "react";
import SuccessIcon from "../../images/success-icon.svg";
import ErrorIcon from "../../images/error-icon.svg";

import "./InfoTooltip.css";
import { Portal } from "@packages/shared";

interface InfoTooltipProps {
	isOpen: boolean;
	onClose: () => void;
	status: string;
}

export const InfoTooltip: FC<InfoTooltipProps> = ({ isOpen, onClose, status }) => {
	const icon = status === "success" ? SuccessIcon : ErrorIcon;
	const text = status === "success" ? "Вы успешно зарегистрировались" : "Что-то пошло не так! Попробуйте ещё раз.";
	return (
		<Portal>
			<div className={`popup ${isOpen && "popup_is-opened"}`}>
				<div className='popup__content'>
					<form className='popup__form' noValidate>
						<button type='button' className='popup__close' onClick={onClose}></button>
						<div>
							<img className='popup__icon' src={icon} alt='' />
							<p className='popup__status-message'>{text}</p>
						</div>
					</form>
				</div>
			</div>
		</Portal>
	);
};
