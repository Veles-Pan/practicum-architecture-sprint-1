import React from "react";
import { Route, Link } from "react-router-dom";
import logoPath from "../../images/logo.svg";
//@ts-ignore
import { SignOut } from "auth/Auth";
import { routes } from "@packages/shared";

export const Header = () => {
	const isLoggedIn = true;
	return (
		<header className='header page__section'>
			<img src={logoPath} alt='Логотип проекта Mesto' className='logo header__logo' />

			{isLoggedIn ? (
				<SignOut />
			) : (
				<>
					<Link className='header__auth-link' to={routes.signin}>
						Войти
					</Link>

					<Link className='header__auth-link' to={routes.register}>
						Регистрация
					</Link>
				</>
			)}
		</header>
	);
};

export default Header;
