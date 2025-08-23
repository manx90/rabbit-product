import { useCart } from "@/hooks/useCartRedux";
import { useFavorites } from "@/hooks/useFavorites";
import { Column, Row } from "@/lib/css/Product";
import { MdDeleteForever } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { Input } from "@/lib/css/Cart";
import SelectingCart from "./selectingCart";
import { useQuery } from "@tanstack/react-query";
import { Optos } from "@/api/optosApi";
import { FaMoneyCheck } from "react-icons/fa";
import {
	useForm,
	FormProvider,
} from "react-hook-form";
import { useEffect, useState } from "react";
import useOrder from "@/hooks/useOrder";
export default function Cart({
	openInfo,
	setOpenInfo,
}) {
	const {
		items,
		updateItemQuantity,
		toggleItemFavorite,
		removeItemByIndex,
	} = useCart();
	const { toggleFavorite, favorites } =
		useFavorites();

	const isItemInFavorites = (item) => {
		return favorites.some(
			(fav) =>
				fav.productId === item.productId &&
				fav.sizeName === item.sizeName &&
				fav.colorName === item.colorName,
		);
	};

	const handleFavoriteToggle = (item, index) => {
		toggleItemFavorite(index);
		toggleFavorite(item);
	};

	const [isPayment, setIsPayment] =
		useState(false);

	return (
		<div
			className={`fixed top-0 left-0 w-full  h-screen bg-black/50 z-50 transition-all duration-300 flex items-center justify-center ${
				openInfo
					? "opacity-100 pointer-events-auto"
					: "opacity-0 pointer-events-none"
			}`}
			onClick={() => setOpenInfo(false)}
		>
			<Column
				dir="rtl"
				className="h-[90vh] max-w-[400px] max-h-[600px] self-auto bg-white dark:bg-gray-900 mx-auto rounded-3xl md:rounded-3xl p-0 w-[90%]    shadow-2xl border-0 md:border border-gray-200 dark:border-gray-800 overflow-auto"
				onClick={(e) => e.stopPropagation()}
			>
				{!isPayment ? (
					<>
						<div className="sticky top-0 bg-white dark:bg-gray-900 z-10 px-6 py-4 border-b border-gray-200 dark:border-gray-800">
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-3">
									<div className="w-8 h-8 bg-blue-200 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
										<svg
											className="w-4 h-4 text-blue-700 dark:text-blue-400"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
										</svg>
									</div>
								</div>
								<button
									onClick={() =>
										setOpenInfo(false)
									}
									className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
								>
									<svg
										className="w-5 h-5 text-gray-600 dark:text-gray-500"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>
						</div>

						<div className="flex-1 overflow-hidden flex flex-col">
							{items.length === 0 ? (
								<div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
									<div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mb-3">
										<svg
											className="w-8 h-8 text-gray-500 dark:text-gray-600"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={1.5}
												d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"
											/>
										</svg>
									</div>
									<h3 className="text-base font-medium text-gray-900 dark:text-white mb-2">
										عربة التسوق فارغة
									</h3>
									<p className="text-xs text-gray-600 dark:text-gray-400 text-center mb-4">
										أضف بعض المنتجات للبدء
									</p>
									<button
										onClick={() =>
											setOpenInfo(false)
										}
										className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-medium rounded-lg transition-colors"
									>
										متابعة التسوق
									</button>
								</div>
							) : (
								<>
									<div className="flex-1 overflow-y-auto px-3 py-2">
										<div className="space-y-2">
											{items.map(
												(item, index) => (
													<div
														key={index}
														className="group"
													>
														<Row className="bg-white gap-2 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-lg p-2 hover:shadow-sm hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200">
															<div className="relative flex flex-shrink-0 justify-center items-center">
																<img
																	src={item.image}
																	alt={item.name}
																	className="w-8 h-8 rounded-md object-contain my-auto  bg-gray-200 dark:bg-gray-700"
																/>
																<div className="absolute top-1 -right-1 w-4 h-4 bg-blue-700 text-white text-xs font-bold rounded-full flex items-center justify-center text-[10px]">
																	{item.qty}
																</div>
															</div>

															<Row className="flex min-w-0 justify-between flex-1 items-center">
																<Row>
																	<Column>
																		<span className="font-medium text-gray-900 dark:text-white text-xl leading-tight mb-1 line-clamp-2">
																			{item.name}
																		</span>
																		<Row>
																			<span className="font-medium text-gray-900 dark:text-slate-400 text-xs leading-tight mb-1 line-clamp-2">
																				{
																					item
																						.category
																						.name
																				}
																			</span>
																		</Row>
																	</Column>
																	<Row className="gap-1 h-fit ">
																		<span className="rounded-full border border-gray-300 bg-blue-50 dark:border-gray-600 dark:bg-blue-900/30 p-1 px-2 font-medium text-blue-700 dark:text-blue-300 text-xs leading-tight mb-1 line-clamp-2 ">
																			{
																				item.sizeName
																			}
																		</span>

																		<span className="rounded-full border border-gray-300 bg-blue-50 dark:border-gray-600 dark:bg-blue-900/30 p-1 px-2 font-medium text-blue-700 dark:text-blue-300 text-xs leading-tight mb-1 line-clamp-2 ">
																			{
																				item.colorName
																			}
																		</span>
																	</Row>
																</Row>

																{/* Quantity Controls */}
																<Column className="mb-2">
																	<div className="flex items-center">
																		<button
																			onClick={() =>
																				updateItemQuantity(
																					index,
																					Math.max(
																						1,
																						item.qty -
																							1,
																					),
																				)
																			}
																			className="w-6 h-6 flex items-center justify-center rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
																		>
																			<svg
																				className="w-3 h-3"
																				fill="none"
																				stroke="currentColor"
																				viewBox="0 0 24 24"
																			>
																				<path
																					strokeLinecap="round"
																					strokeLinejoin="round"
																					strokeWidth={
																						2
																					}
																					d="M20 12H4"
																				/>
																			</svg>
																		</button>
																		<span className="w-8 mx-auto text-center text-xs font-medium text-gray-900 dark:text-white">
																			{item.qty}
																		</span>
																		<button
																			onClick={() =>
																				updateItemQuantity(
																					index,
																					item.qty +
																						1,
																				)
																			}
																			className="w-6 h-6 flex items-center justify-center rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
																		>
																			<svg
																				className="w-3 h-3"
																				fill="none"
																				stroke="currentColor"
																				viewBox="0 0 24 24"
																			>
																				<path
																					strokeLinecap="round"
																					strokeLinejoin="round"
																					strokeWidth={
																						2
																					}
																					d="M12 4v16m8-8H4"
																				/>
																			</svg>
																		</button>
																	</div>
																	<Row
																		dir="ltr"
																		className="justify-center space-x-2"
																	>
																		<button
																			onClick={() =>
																				removeItemByIndex(
																					index,
																				)
																			}
																			className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
																			title="حذف من السلة"
																		>
																			<MdDeleteForever className="w-5 h-5 text-red-500 " />
																		</button>
																		<button
																			onClick={() =>
																				handleFavoriteToggle(
																					item,
																					index,
																				)
																			}
																			className="p-1   rounded"
																			title={
																				isItemInFavorites(
																					item,
																				)
																					? "إزالة من المفضلة"
																					: "إضافة إلى المفضلة"
																			}
																		>
																			{isItemInFavorites(
																				item,
																			) ? (
																				<FaHeart className="w-5 h-5 text-red-500 " />
																			) : (
																				<FaRegHeart className="w-5 h-5 text-red-500 " />
																			)}
																		</button>
																	</Row>
																</Column>
															</Row>
														</Row>
													</div>
												),
											)}
										</div>
									</div>

									<div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-3">
										<div className="space-y-2">
											<div className="flex justify-between items-center">
												<span className="text-xs text-gray-600 dark:text-gray-400">
													المجموع (
													{items.reduce(
														(sum, item) =>
															sum + item.qty,
														0,
													)}{" "}
													منتج)
												</span>
												<span className="text-sm font-semibold text-gray-900 dark:text-white">
													$
													{items
														.reduce(
															(sum, item) =>
																sum +
																item.price *
																	item.qty,
															0,
														)
														.toFixed(2)}
												</span>
											</div>

											<button
												onClick={() =>
													setIsPayment(true)
												}
												className="w-full flex items-center justify-center gap-2  bg-blue-700 hover:bg-blue-800 disabled:bg-gray-400 dark:disabled:bg-gray-700 text-white font-medium py-2.5 px-3 rounded-lg transition-colors shadow-sm disabled:cursor-not-allowed "
											>
												<span className="text-sm">
													الدفع
												</span>
												<FaMoneyCheck className="w-4 h-4" />
											</button>

											<button
												onClick={() =>
													setOpenInfo(false)
												}
												className="w-full text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium py-1.5 text-xs transition-colors"
											>
												متابعة التسوق
											</button>
										</div>
									</div>
								</>
							)}
						</div>
					</>
				) : (
					<CartPayment
						setIsPayment={setIsPayment}
					/>
				)}
			</Column>
		</div>
	);
}
function CartPayment({ setIsPayment }) {
	const methods = useForm({
		defaultValues: {
			consignee_city: "", // مهم
			consignee_area: "",
			consignee_name: "",
			consignee_phone: "",
			consignee_address: "",
		},
	});
	const { items } = useCart();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = methods;
	var consignee_city = watch("consignee_city");
	const { data: cities = [] } = useQuery({
		queryKey: ["cities"],
		queryFn: () =>
			Optos.getCity().then((res) => res[0].data),
	});

	const {
		data: areas = [],
		refetch: refetchAreas,
	} = useQuery({
		queryKey: ["areas", consignee_city],
		queryFn: () =>
			Optos.gitArea(consignee_city).then(
				(res) => res[0].data,
			),
	});
	useEffect(() => {
		refetchAreas();
	}, [consignee_city]);

	const onSubmit = (data) => {
		const itemsData = items.map((item) => ({
			colorName: item.colorName,
			sizeName: item.sizeName,
			quantity: item.qty,
			productId: item.productId,
		}));
		const Data = { ...data, items: itemsData };
		const { Res } = useOrder(Data);
		Res();
		setIsPayment(false);
	};

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-4"
			>
				<Column className="flex overflow-auto flex-col gap-4 mt-2 px-8 pt-4	">
					<Column>
						<label>اسم المستخدم</label>
						<Input
							type="text"
							placeholder="اسم المستخدم"
							{...register("consignee_name", {
								required: true,
								pattern: {
									value: /^[a-zA-Zء-ي\s]+$/,
									message:
										"اسم المستخدم يجب أن يكون حروف",
								},
								setValueAs: (value) => {
									value = value.trim();
									return value;
								},
							})}
						/>
					</Column>

					<Column>
						<Row>
							<label>رقم الهاتف</label>
						</Row>
						<Input
							type="text"
							placeholder="رقم الهاتف"
							{...register("consignee_phone", {
								required: true,
								pattern: {
									value: /^[0-9]{10}$/,
									message:
										"رقم الهاتف يجب أن يكون 10 أرقام",
								},
							})}
						/>

						{errors.consignee_phone && (
							<p className="text-red-500 text-xs">
								{errors.consignee_phone.message}
							</p>
						)}
					</Column>

					<Column>
						<label>المدينة</label>
						<SelectingCart
							items={cities}
							placeholder="المدينة"
							registerName="consignee_city"
						/>

						<label>المنطقة</label>
						<SelectingCart
							items={areas}
							disabled={!consignee_city}
							placeholder="المنطقة"
							registerName="consignee_area"
						/>
					</Column>

					<Column>
						<label>العنوان تفصيلي</label>
						<Input
							type="text"
							placeholder="العنوان"
							{...register("consignee_address")}
						/>
					</Column>
				</Column>
				<Column className="px-8 flex flex-col gap-4">
					<button
						type="submit"
						className="w-full justify-center mx-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:bg-gray-400 dark:disabled:bg-gray-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center gap-2 transform hover:scale-[1.02] active:scale-[0.98] border border-blue-600 dark:border-blue-500"
					>
						<FaMoneyCheck className="w-5 h-5" />
						<span className="text-base">
							إرسال الطلب
						</span>
					</button>
					<button
						onClick={() => setIsPayment(false)}
						className="w-full text-blue-600 hover:text-blue-400 font-medium py-2 text-sm transition-colors"
					>
						العودة للسلة
					</button>
				</Column>
			</form>
		</FormProvider>
	);
}
