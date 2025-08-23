import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cart from "../components/Cart";
import { useState } from "react";

const Layout = ({ children }) => {
	const [openInfo, setOpenInfo] = useState(false);
	return (
		<div className="flex flex-col custom-scrollbar h-full overflow-y-auto">
			<header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
				<Header
					openInfo={openInfo}
					setOpenInfo={setOpenInfo}
				/>
			</header>
			<main className=" mt-[75px]">
				{children}
			</main>
			<Cart
				openInfo={openInfo}
				setOpenInfo={setOpenInfo}
			/>
			<Footer />
		</div>
	);
};

export default Layout;
