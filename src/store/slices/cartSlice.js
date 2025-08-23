import { createSlice } from "@reduxjs/toolkit";

const CART_KEY = "cart";
const ONE_HOUR = 1000 * 60 * 60;

const loadCartFromStorage = () => {
	const saved = localStorage.getItem(CART_KEY);
	if (saved) {
		try {
			const { data, timestamp } =
				JSON.parse(saved);
			if (Date.now() - timestamp < ONE_HOUR) {
				return data;
			} else {
				localStorage.removeItem(CART_KEY);
			}
		} catch (e) {
			console.error(
				"Error parsing cart from localStorage",
				e,
			);
		}
	}
	return [];
};
const saveCartToStorage = (items) => {
	if (items.length > 0) {
		localStorage.setItem(
			CART_KEY,
			JSON.stringify({
				data: items,
				timestamp: Date.now(),
			}),
		);
	} else {
		localStorage.removeItem(CART_KEY);
	}
};
const initialState = {
	items: loadCartFromStorage(),
};
const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem: (state, action) => {
			const product = action.payload;
			const exists = state.items.find(
				(p) =>
					p.productId === product.productId &&
					p.sizeName === product.sizeName &&
					p.colorName === product.colorName,
			);
			console.log(
				"Cart items:",
				JSON.parse(JSON.stringify(state.items)),
			);

			if (exists) {
				exists.qty += product.qty;
			} else {
				// Ensure the item has isFavorite property
				const newItem = {
					...product,
					isFavorite: product.isFavorite || false,
				};
				state.items.push(newItem);
			}
			saveCartToStorage(state.items);
		},

		removeItem: (state, action) => {
			const { productId, sizeName, colorName } =
				action.payload;
			state.items = state.items.filter(
				(p) =>
					!(
						p.productId === productId &&
						p.sizeName === sizeName &&
						p.colorName === colorName
					),
			);
			saveCartToStorage(state.items);
		},

		removeItemByIndex: (state, action) => {
			const index = action.payload;
			if (
				index >= 0 &&
				index < state.items.length
			) {
				state.items.splice(index, 1);
				saveCartToStorage(state.items);
			}
		},

		changeQty: (state, action) => {
			const {
				productId,
				sizeName,
				colorName,
				qty,
			} = action.payload;
			if (qty < 1) return;

			const item = state.items.find(
				(p) =>
					p.productId === productId &&
					p.sizeName === sizeName &&
					p.colorName === colorName,
			);
			if (item) {
				item.qty = qty;
			}
			saveCartToStorage(state.items);
		},

		updateItemQuantity: (state, action) => {
			const { index, qty } = action.payload;
			if (qty < 1) return;

			if (
				index >= 0 &&
				index < state.items.length
			) {
				state.items[index].qty = qty;
				saveCartToStorage(state.items);
			}
		},

		updateItemSize: (state, action) => {
			const { index, size } = action.payload;

			if (
				index >= 0 &&
				index < state.items.length
			) {
				state.items[index].sizeName = size;
				saveCartToStorage(state.items);
			}
		},

		updateItemColor: (state, action) => {
			const { index, color } = action.payload;

			if (
				index >= 0 &&
				index < state.items.length
			) {
				state.items[index].colorName = color;
				saveCartToStorage(state.items);
			}
		},

		clearCart: (state) => {
			state.items = [];
			saveCartToStorage(state.items);
		},

		toggleItemFavorite: (state, action) => {
			const { index } = action.payload;
			if (
				index >= 0 &&
				index < state.items.length
			) {
				state.items[index].isFavorite =
					!state.items[index].isFavorite;
				saveCartToStorage(state.items);
			}
		},
	},
});
export const {
	addItem,
	removeItem,
	removeItemByIndex,
	changeQty,
	updateItemQuantity,
	updateItemSize,
	updateItemColor,
	clearCart,
	toggleItemFavorite,
} = cartSlice.actions;
export const selectCartItems = (state) =>
	state.cart.items;
export const selectTotalQty = (state) =>
	state.cart.items.reduce(
		(sum, item) => sum + item.qty,
		0,
	);
export default cartSlice.reducer;
