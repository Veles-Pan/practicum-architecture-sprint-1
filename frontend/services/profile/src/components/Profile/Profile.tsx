import { UserDispatch, getUser, updateAvatar, updateUser } from "@packages/shared";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditAvatarPopup } from "../EditAvatarPopup";
import { EditProfilePopup } from "../EditProfilePopup";

import "./Profile.css";

export const Profile: FC = () => {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

	const dispatch = useDispatch<UserDispatch>();

	const currentUser = useSelector(getUser);

	const imageStyle = { backgroundImage: `url(${currentUser?.avatar})` };

	const onEditAvatar = () => {
		setIsEditAvatarPopupOpen(true);
	};

	const onEditAvatarClose = () => {
		setIsEditAvatarPopupOpen(false);
	};

	const onEditProfile = () => {
		setIsEditProfilePopupOpen(true);
	};

	const onEditProfileClose = () => {
		setIsEditProfilePopupOpen(false);
	};

	const handleUpdateAvatar = (data: { avatar: string }) => {
		dispatch(updateAvatar(data));
		onEditAvatarClose();
	};

	const handleUpdateUser = (data: { name: string; about: string }) => {
		dispatch(updateUser(data));
		onEditProfileClose();
	};

	return (
		<>
			<div className='profile__image' onClick={onEditAvatar} style={imageStyle}></div>
			<div className='profile__info'>
				<h1 className='profile__title'>{currentUser?.name}</h1>
				<button className='profile__edit-button' type='button' onClick={onEditProfile}></button>
				<p className='profile__description'>{currentUser?.about}</p>
			</div>
			<EditAvatarPopup
				onUpdateAvatar={handleUpdateAvatar}
				isOpen={isEditAvatarPopupOpen}
				onClose={onEditAvatarClose}
			/>
			<EditProfilePopup
				onUpdateUser={handleUpdateUser}
				isOpen={isEditProfilePopupOpen}
				onClose={onEditProfileClose}
				currentUser={currentUser}
			/>
		</>
	);
};
