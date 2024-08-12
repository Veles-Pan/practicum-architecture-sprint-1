import { UserDispatch, getEmail, logout, routes } from "@packages/shared";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./SignOut.css";

export const SignOut: FC = () => {
	const email = useSelector(getEmail);
	const dispatch = useDispatch<UserDispatch>();

	const navigate = useNavigate();

	const handleSignOut = () => {
		dispatch(logout());
		navigate(routes.signin, { replace: true });
	};

	return (
		<div className='header__wrapper'>
			<p className='header__user'>{email}</p>
			<button className='header__logout' onClick={handleSignOut}>
				Выйти
			</button>
		</div>
	);
};
