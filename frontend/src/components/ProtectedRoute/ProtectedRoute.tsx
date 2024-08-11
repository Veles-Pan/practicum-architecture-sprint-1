import { FC, PropsWithChildren } from "react";

import { Navigate } from "react-router-dom";

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
	const isLoggedIn = false;

	if (!isLoggedIn) {
		return <Navigate to='./signin' replace={true} />;
	}

	return isLoggedIn ? children : null;
};
