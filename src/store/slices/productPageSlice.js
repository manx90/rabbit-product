import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	selectedColor: "",
	selectedSize: "",
	quantity: 1,
};

const productPageSlice = createSlice({
	name: "productPage",
	initialState,
	reducers: {
		setSelectedColor: (state, action) => {
			state.selectedColor = action.payload;
		},

		setSelectedSize: (state, action) => {
			state.selectedSize = action.payload;
		},

		setQuantity: (state, action) => {
			state.quantity = action.payload;
		},

		handleQuantityChange: (state, action) => {
			const { newQuantity, maxQuantity } =
				action.payload;
			if (
				newQuantity >= 1 &&
				newQuantity <= maxQuantity
			) {
				state.quantity = newQuantity;
			}
		},

		initializeDefaults: (state, action) => {
			const { product } = action.payload;

			// Initialize color if not set and product has colors
			if (
				!state.selectedColor &&
				product.colors?.length > 0
			) {
				state.selectedColor =
					product.colors[0].name;
			}

			// Initialize size if not set and product has sizes
			if (
				!state.selectedSize &&
				product.sizeDetails?.length > 0
			) {
				state.selectedSize =
					product.sizeDetails[0].sizeName;
			}
		},

		resetState: () => initialState,
	},
});

export const {
	setSelectedColor,
	setSelectedSize,
	setQuantity,
	handleQuantityChange,
	initializeDefaults,
	resetState,
} = productPageSlice.actions;

// Selectors
export const selectSelectedColor = (state) =>
	state.productPage.selectedColor;
export const selectSelectedSize = (state) =>
	state.productPage.selectedSize;
export const selectQuantity = (state) =>
	state.productPage.quantity;

export default productPageSlice.reducer;
