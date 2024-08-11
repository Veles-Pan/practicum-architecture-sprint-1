import { FC } from "react";
//@ts-expect-error
import { Register } from "auth/Auth";

export const RegisterPage: FC = () => {
	return (
		<div>
			<Register />
		</div>
	);
};
