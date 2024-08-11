import { UserDispatch, registerUser } from "@packages/shared";
import { FC, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import "./Register.css";

export const Register: FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const dispatch = useDispatch<UserDispatch>();

	function handleSubmit(e: FormEvent) {
		e.preventDefault();

		dispatch(registerUser({ email, password }))
			.then((action) => {
				if (registerUser.fulfilled.match(action)) {
					console.log("User logged in", action.payload);
					navigate("/", { replace: true });
				} else {
					console.log("Error logging in", action.error.message);
				}
			})
			.catch((error) => {
				console.log("Unexpected error", error);
			});
	}

	return (
		<div className='auth-form'>
			<form className='auth-form__form' onSubmit={handleSubmit}>
				<div className='auth-form__wrapper'>
					<h3 className='auth-form__title'>Регистрация</h3>
					<label className='auth-form__input'>
						<input
							type='text'
							name='email'
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
				<div className='auth-form__wrapper'>
					<button className='auth-form__button' type='submit'>
						Зарегистрироваться
					</button>
					<p className='auth-form__text'>
						Уже зарегистрированы?{" "}
						<Link className='auth-form__link' to='/signin'>
							Войти
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
};
