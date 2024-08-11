import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@packages/shared/src/data";

export const App = () => {
	return (
		<Provider store={store}>
			<div data-testid={"App.DataTestId"}>
				<h1>PAGE</h1>
				<br />

				<Outlet />
			</div>
		</Provider>
	);
};
