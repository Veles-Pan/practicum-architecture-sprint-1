import { UserDispatch, loginUser, routes } from "@packages/shared";
import { FC, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

import "./Signin.css";

export const Signin: FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch<UserDispatch>();

	function handleSubmit(e: FormEvent) {
		e.preventDefault();

		dispatch(loginUser({ email, password }))
			.then((action) => {
				// Проверяем, был ли экшен успешным
				if (loginUser.fulfilled.match(action)) {
					console.log("User logged in", action.payload);
				} else {
					console.log("Error logging in", action.error.message);
				}
			})
			.catch((error) => {
				// Здесь .catch срабатывает только на ошибки, произошедшие внутри `dispatch`, например, если возникла ошибка в процессе dispatch-а.
				console.log("Unexpected error", error);
			});
	}

	return (
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
	);
};
