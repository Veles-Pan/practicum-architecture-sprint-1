import { Outlet } from "react-router-dom";

//@ts-ignore
import { useCheckAuth } from "auth/Auth";

import "./App.css";
import { Header } from "../Header";
import { Footer } from "../Footer";

export const App = () => {
	useCheckAuth();

	return (
		<div className='page__content'>
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
};
