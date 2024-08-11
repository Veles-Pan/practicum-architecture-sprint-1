import { createBrowserRouter } from "react-router-dom";
import { App } from "../components/App/App";

import { ProtectedRoute } from "../components/ProtectedRoute";
import { SigninPage } from "../pages/SigninPage";
import { MainPage } from "../pages/MainPage";
import { routes } from "@packages/shared";

export const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				path: routes.main,
				element: (
					<ProtectedRoute>
						<MainPage />
					</ProtectedRoute>
				)
			},
			{
				path: routes.signin,
				element: <SigninPage />
			}
		]
	}
]);
