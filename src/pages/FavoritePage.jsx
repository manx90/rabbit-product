import React from "react";
import Header from "@/components/Header";
import FavoriteProduct from "@/components/FavoriteProduct";
export default function FavoritePage() {
	return (
		<div className="flex flex-col mt-20">
			<Header />
			<FavoriteProduct />
			<FavoriteProduct />
			<FavoriteProduct />
			<FavoriteProduct />
			<FavoriteProduct />
			<FavoriteProduct />
			<FavoriteProduct />
			<FavoriteProduct />
		</div>
	);
}
