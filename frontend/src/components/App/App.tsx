import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@packages/shared/src/data";

import "./App.css";

export const App = () => {
	return (
		<Provider store={store}>
			<div className='page__content'>
				<Outlet />
			</div>
		</Provider>
	);
};
