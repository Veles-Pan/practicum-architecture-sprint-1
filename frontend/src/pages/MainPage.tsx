import { FC } from "react";
//@ts-expect-error
import { Gallery, AddCard } from "gallery/Gallery";
//@ts-expect-error
import { Profile } from "profile/Profile";

export const MainPage: FC = () => {
	return (
		<main className='content '>
			<section className='profile page__section'>
				<Profile />
				<AddCard />
			</section>

			<Gallery />
		</main>
	);
};
