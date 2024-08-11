import { UserDispatch, checkToken, fetchUserData, getUser, routes } from "@packages/shared";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export const useCheckAuth = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const dispatch = useDispatch<UserDispatch>();

	useEffect(() => {
		dispatch(checkToken())
			.then((action) => {
				if (checkToken.fulfilled.match(action)) {
					dispatch(fetchUserData()).then(() => {
						navigate(routes.main, { replace: true });
					});
				} else {
					location.pathname !== routes.signin &&
						location.pathname !== routes.register &&
						navigate(routes.signin, { replace: true });
				}
			})
			.catch(() => {
				location.pathname !== routes.signin &&
					location.pathname !== routes.register &&
					navigate(routes.signin, { replace: true });
			});
	}, []);
};
