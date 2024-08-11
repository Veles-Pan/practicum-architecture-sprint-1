import { FC } from "react";
//@ts-expect-error
import { Gallery } from "gallery/Gallery";

export const MainPage: FC = () => {
	console.log("object");
	return (
		<div>
			<Gallery />
		</div>
	);
};
