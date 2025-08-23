import { createSlice } from "@reduxjs/toolkit";

const FAVORITES_KEY = "favorites";
const ONE_HOUR = 1000 * 60 * 60;

const loadFavoritesFromStorage = () => {
	const saved = localStorage.getItem(
		FAVORITES_KEY,
	);
	if (saved) {
		try {
			const { data, timestamp } =
				JSON.parse(saved);
			if (Date.now() - timestamp < ONE_HOUR) {
				return data;
			} else {
				localStorage.removeItem(FAVORITES_KEY);
			}
		} catch (e) {
			console.error(
				"Error parsing favorites from localStorage",
				e,
			);
		}
	}
	return [];
};

const saveFavoritesToStorage = (favorites) => {
	if (favorites.length > 0) {
		localStorage.setItem(
			FAVORITES_KEY,
			JSON.stringify({
				data: favorites,
				timestamp: Date.now(),
			}),
		);
	} else {
		localStorage.removeItem(FAVORITES_KEY);
	}
};

const initialState = {
	favorites: loadFavoritesFromStorage(),
};

const favoritesSlice = createSlice({
	name: "favorites",
	initialState,
	reducers: {
		addToFavorites: (state, action) => {
			const product = action.payload;
			const exists = state.favorites.find(
				(fav) =>
					fav.productId === product.productId &&
					fav.sizeName === product.sizeName &&
					fav.colorName === product.colorName,
			);

			if (!exists) {
				state.favorites.push({
					...product,
					isFavorite: true,
				});
				saveFavoritesToStorage(state.favorites);
			}
		},

		removeFromFavorites: (state, action) => {
			const { productId, sizeName, colorName } =
				action.payload;
			state.favorites = state.favorites.filter(
				(fav) =>
					!(
						fav.productId === productId &&
						fav.sizeName === sizeName &&
						fav.colorName === colorName
					),
			);
			saveFavoritesToStorage(state.favorites);
		},

		toggleFavorite: (state, action) => {
			const product = action.payload;
			const exists = state.favorites.find(
				(fav) =>
					fav.productId === product.productId &&
					fav.sizeName === product.sizeName &&
					fav.colorName === product.colorName,
			);

			if (exists) {
				// Remove from favorites
				state.favorites = state.favorites.filter(
					(fav) =>
						!(
							fav.productId ===
								product.productId &&
							fav.sizeName === product.sizeName &&
							fav.colorName === product.colorName
						),
				);
			} else {
				// Add to favorites
				state.favorites.push({
					...product,
					isFavorite: true,
				});
			}
			saveFavoritesToStorage(state.favorites);
		},

		clearFavorites: (state) => {
			state.favorites = [];
			saveFavoritesToStorage(state.favorites);
		},

		// Update cart item favorite status
		updateCartItemFavoriteStatus: (
			state,
			action,
		) => {
			const {
				productId,
				sizeName,
				colorName,
				isFavorite,
			} = action.payload;
			const favorite = state.favorites.find(
				(fav) =>
					fav.productId === productId &&
					fav.sizeName === sizeName &&
					fav.colorName === colorName,
			);

			if (isFavorite && !favorite) {
				// Add to favorites if not exists
				state.favorites.push({
					productId,
					sizeName,
					colorName,
					isFavorite: true,
				});
			} else if (!isFavorite && favorite) {
				// Remove from favorites if exists
				state.favorites = state.favorites.filter(
					(fav) =>
						!(
							fav.productId === productId &&
							fav.sizeName === sizeName &&
							fav.colorName === colorName
						),
				);
			}
			saveFavoritesToStorage(state.favorites);
		},
	},
});

export const {
	addToFavorites,
	removeFromFavorites,
	toggleFavorite,
	clearFavorites,
	updateCartItemFavoriteStatus,
} = favoritesSlice.actions;

export const selectFavorites = (state) =>
	state.favorites.favorites;
export const selectFavoritesCount = (state) =>
	state.favorites.favorites.length;
export const selectIsFavorite = (
	state,
	productId,
	sizeName,
	colorName,
) =>
	state.favorites.favorites.some(
		(fav) =>
			fav.productId === productId &&
			fav.sizeName === sizeName &&
			fav.colorName === colorName,
	);

export default favoritesSlice.reducer;
