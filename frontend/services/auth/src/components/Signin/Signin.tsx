import { UserDispatch, checkToken, fetchUserData, loginUser } from "@packages/shared";
import { FC, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Signin.css";
import { InfoTooltip } from "../InfoTooltip";

export const Signin: FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [isTooltipOpen, setIsTooltipOpen] = useState(false);
	const [tooltipStatus, setTooltipStatus] = useState("");

	const navigate = useNavigate();

	const dispatch = useDispatch<UserDispatch>();

	const showErrorTooltip = () => {
		setTooltipStatus("fail");
		setIsTooltipOpen(true);
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		try {
			const loginAction = await dispatch(loginUser({ email, password }));
			if (loginUser.fulfilled.match(loginAction)) {
				const tokenAction = await dispatch(checkToken());
				if (checkToken.fulfilled.match(tokenAction)) {
					const userDataAction = await dispatch(fetchUserData());
					if (fetchUserData.fulfilled.match(userDataAction)) {
						navigate("/", { replace: true });
					} else {
						showErrorTooltip();
					}
				} else {
					showErrorTooltip();
				}
			} else {
				showErrorTooltip();
			}
		} catch (error) {
			showErrorTooltip();
		}
	};
	const handleClose = () => {
		setIsTooltipOpen(false);
	};

	return (
		<>
			<div className='auth-form'>
				<form className='auth-form__form' onSubmit={handleSubmit}>
					<div className='auth-form__wrapper'>
						<h3 className='auth-form__title'>Вход</h3>
						<label className='auth-form__input'>
							<input
								type='text'
								name='name'
								id='email'
								className='auth-form__textfield'
								placeholder='Email'
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</label>
						<label className='auth-form__input'>
							<input
								type='password'
								name='password'
								id='password'
								className='auth-form__textfield'
								placeholder='Пароль'
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</label>
					</div>
					<button className='auth-form__button' type='submit'>
						Войти
					</button>
				</form>
			</div>
			<InfoTooltip isOpen={isTooltipOpen} status={tooltipStatus} onClose={handleClose} />
		</>
	);
};
