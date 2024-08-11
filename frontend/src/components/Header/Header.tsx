import { Link, useLocation } from "react-router-dom";
import logoPath from "../../images/logo.svg";
//@ts-ignore
import { SignOut } from "auth/Auth";
import { routes } from "@packages/shared";

export const Header = () => {
	const location = useLocation();

	const HeaderComponent = () => {
		switch (location.pathname) {
			case routes.register:
				return (
					<Link className='header__auth-link' to={routes.signin}>
						Войти
					</Link>
				);
			case routes.signin:
				return (
					<Link className='header__auth-link' to={routes.register}>
						Регистрация
					</Link>
				);
			case routes.main:
				return <SignOut />;
		}
	};

	return (
		<header className='header page__section'>
			<img src={logoPath} alt='Логотип проекта Mesto' className='logo header__logo' />

			<HeaderComponent />
		</header>
	);
};

export default Header;
