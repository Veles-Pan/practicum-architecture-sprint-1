import { FC } from "react";
//@ts-expect-error
import { Gallery, AddCard } from "gallery/Gallery";
//@ts-expect-error
import { Profile } from "auth/Auth";
import { Header } from "../components/Header";

export const MainPage: FC = () => {
	return (
		<>
			<Header />
			<main className='content '>
				<section className='profile page__section'>
					<Profile />
					<AddCard />
				</section>

				<Gallery />
			</main>
		</>
	);
};
