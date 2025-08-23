import {
	useSelector,
	useDispatch,
} from "react-redux";
import {
	addItem,
	removeItem,
	removeItemByIndex,
	changeQty,
	updateItemQuantity,
	updateItemSize,
	updateItemColor,
	clearCart,
	toggleItemFavorite,
	selectCartItems,
	selectTotalQty,
} from "../store/slices/cartSlice";

export const useCart = () => {
	const dispatch = useDispatch();
	const items = useSelector(selectCartItems);
	const totalQty = useSelector(selectTotalQty);

	return {
		items,
		totalQty,
		addItem: (product) =>
			dispatch(addItem(product)),
		removeItem: (
			productId,
			sizeName,
			colorName,
		) =>
			dispatch(
				removeItem({
					productId,
					sizeName,
					colorName,
				}),
			),
		removeItemByIndex: (index) =>
			dispatch(removeItemByIndex(index)),
		changeQty: (
			productId,
			sizeName,
			colorName,
			qty,
		) =>
			dispatch(
				changeQty({
					productId,
					sizeName,
					colorName,
					qty,
				}),
			),
		updateItemQuantity: (index, qty) =>
			dispatch(
				updateItemQuantity({ index, qty }),
			),
		updateItemSize: (index, size) =>
			dispatch(updateItemSize({ index, size })),
		updateItemColor: (index, color) =>
			dispatch(updateItemColor({ index, color })),
		toggleItemFavorite: (index) =>
			dispatch(toggleItemFavorite({ index })),
		clearCart: () => dispatch(clearCart()),
	};
};
