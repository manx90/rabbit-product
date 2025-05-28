import Header from "./../components/Header";
import Footer from "./../components/footer";
import Category from "../components/category";
import ProductSlider from "./../components/product";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import {
	Card,
	CardContent,
} from "@/components/ui/card";
import SideBar from "@/components/SideBar";
import { useState } from "react";
import data from './../data/products_with_real_images.json'
import React from "react";

export default function Home() {
	const [Menubar, setMenubar] = useState(false);

	// Group products by category
	const groupedProducts = data.reduce((acc, product) => {
		if (!acc[product.category]) {
			acc[product.category] = [];
		}
		acc[product.category].push(product);
		return acc;
	}, {});

	return (
		<>
			<Header
				Menubar={Menubar}
				setMenubar={setMenubar}
			/>
			{!Menubar && (
				<>
					<Announcement />
					<NoteScrolling />

					{Object.entries(groupedProducts).map(([category, products]) => (
						<React.Fragment key={category}>
							<Category name={category} all={true} />
							<ProductSlider products={products} />
						</React.Fragment>
					))}
				</>
			)}

			<Footer />
			<SideBar Menubar={Menubar} />
		</>
	);
}

function Announcement() {
	return (
		<div className="bg-[#E04444] mb-[10px] mt-[70px] text-[white] text-center text-[14px] py-[4px] px-[10px] font-Lato">
			التوصيل مجانا ولفترة محدودة لجميع انحاء
			الضفة
		</div>
	);
}

function NoteScrolling() {
	return (
		<div className="w-full flex items-center justify-center">
			<Carousel
				opts={{
					align: "center",
					loop: true,
				}}
				className="w-full max-w-[550px] p-0 flex"
			>
				<CarouselContent>
					{Array.from({ length: 3 }).map(
						(_, index) => (
							<CarouselItem key={index} className="w-full basis-full">
								<div className="w-full h-auto">
									<img
										src={`/note.png`}
										alt="Promotion Banner"
										className="w-full h-auto object-contain"
									/>
								</div>
							</CarouselItem>
						),
					)}
				</CarouselContent>
				<CarouselPrevious className="left-2" />
				<CarouselNext className="right-2" />
			</Carousel>
		</div>
	);
}
