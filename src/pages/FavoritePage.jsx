import React from "react";
import { useFavorites } from "@/hooks/useFavorites";
import FavoriteProduct from "@/components/FavoriteProduct";

export default function FavoritePage() {
	const { favorites, favoritesCount } =
		useFavorites();

	if (favoritesCount === 0) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-8">
				<div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
					<svg
						className="w-8 h-8 text-gray-500 dark:text-gray-600"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
					</svg>
				</div>
				<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
					لا توجد منتجات مفضلة
				</h3>
				<p className="text-sm text-gray-600 dark:text-gray-400 text-center">
					لم تقم بإضافة أي منتجات إلى المفضلة بعد
				</p>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-6">
			<div className="mb-6">
				<h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
					المنتجات المفضلة
				</h1>
				<p className="text-sm text-gray-600 dark:text-gray-400">
					{favoritesCount} منتج في المفضلة
				</p>
			</div>
			<div className="grid gap-4">
				{favorites.map((favorite, index) => (
					<FavoriteProduct
						key={index}
						product={favorite}
					/>
				))}
			</div>
		</div>
	);
}
