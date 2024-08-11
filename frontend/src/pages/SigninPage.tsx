import { FC } from "react";
//@ts-expect-error
import { Signin } from "auth/Auth";

export const SigninPage: FC = () => {
	return (
		<div>
			<Signin />
		</div>
	);
};
