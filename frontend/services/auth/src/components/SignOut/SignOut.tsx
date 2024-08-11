import { getEmail } from "@packages/shared";
import { FC } from "react";
import { useSelector } from "react-redux";

export const SignOut: FC = () => {
	const email = useSelector(getEmail);

	const handleSignOut = () => {};

	return (
		<div className='header__wrapper'>
			<p className='header__user'>{email}</p>
			<button className='header__logout' onClick={handleSignOut}>
				Выйти
			</button>
		</div>
	);
};
