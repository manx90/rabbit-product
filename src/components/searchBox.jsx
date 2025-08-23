"use client";

import * as React from "react";
import { SearchIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/api/productAPI";
import {
	Column,
	CommandItem,
	Row,
} from "@/lib/css/Product";
import { useNavigate } from "react-router-dom";
import { Category } from "@/api/cateogryApi";

export default function SearchBox({
	className,
	ctrl,
}) {
	const [query, setQuery] = useState("");
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const { data: products, refetch } = useQuery({
		queryKey: ["search-products", query],
		queryFn: () =>
			Product.getAll({
				q: query,
				limit: 10,
			}),
	});
	const {
		data: categories,
		refetch: refetchCategories,
	} = useQuery({
		queryKey: ["search-categories", query],
		queryFn: () =>
			Category.getAll({ q: query, limit: 10 }),
	});

	useEffect(() => {
		refetch();
		refetchCategories();
	}, [query, setQuery]);

	useEffect(() => {
		const down = (e) => {
			if (
				e.key === "k" &&
				(e.metaKey || e.ctrlKey)
			) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () =>
			document.removeEventListener(
				"keydown",
				down,
			);
	}, []);

	return (
		<>
			<button
				dir="rtl"
				className={cn(
					"border-input bg-background text-foreground placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-9 w-full rounded-md border px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]",
					className,
				)}
				onClick={() => setOpen(!open)}
			>
				<span
					dir="rtl"
					className="flex grow items-center"
				>
					<SearchIcon
						className="text-muted-foreground/80 -ms-1 me-3"
						size={16}
						aria-hidden="true"
					/>
					<span className="text-muted-foreground/70 font-normal">
						بحث ...
					</span>
				</span>
				<kbd className="bg-background text-muted-foreground/70 ms-12 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
					{ctrl ? "⌘K" : "بحث"}
				</kbd>
			</button>
			{/* <CommandDialog
				open={open}
				onOpenChange={setOpen}
				dir="rtl"
				className="bg-white dark:bg-gray-900"
			>
				<CommandInput
					className="border-0 focus:border-0"
					placeholder="بحث..."
					dir="rtl"
					onValueChange={(value) =>
						setQuery(value)
					}
				/>
				<Column
					dir="rtl"
					className="gap-1 mt-2 overflow-y-auto  lg:max-h-[400px] max-h-[400px]  custom-scrollbar bg-gray-100 dark:bg-gray-900"
				>
					<Row>
						<span className="text-[12px] w-full pr-5 text-gray-500 py-2">
							المنتجات
						</span>
					</Row>
					{products?.data?.map((product) => (
						<CommandItem key={product.id}>
							<Row
								onClick={() => {
									navigate(
										`/product/${product.id}`,
									);
								}}
								className="w-full justify-between"
							>
								<Column>
									<span className="text-sm font-bold">
										{product.name}
									</span>
									<span className="text-xs text-gray-500 dark:text-gray-400">
										{product.category.name}
									</span>
								</Column>
								<img
									src={`${
										import.meta.env
											.VITE_RABBIT_PI_BASE_URL
									}/uploads/${product.imgCover}`}
									alt={product.name}
									className="w-10 h-10 rounded-sm object-cover"
								/>
							</Row>
						</CommandItem>
					))}
					<Row>
						<span className="text-[12px] w-full pr-5 dark:text-gray-500 text-black border-t border-gray-700 py-2 pt-4">
							التصنيفات
						</span>
					</Row>
					{categories?.data?.map((category) => (
						<CommandItem key={category.id}>
							<Row
								onClick={() => {
									navigate(
										`/category/${category.id}`,
									);
								}}
								className="w-full justify-between"
							>
								<Column>
									<span className="text-sm text-black dark:text-gray-500 font-bold">
										{category.name}
									</span>
								</Column>
							</Row>
						</CommandItem>
					))}
				</Column>
			</CommandDialog> */}
			<SearchToggle
				className={className}
				open={open}
				setOpen={setOpen}
				products={products}
				categories={categories}
				setQuery={setQuery}
				navigate={navigate}
			/>
		</>
	);
}

function SearchToggle({
	className,
	open,
	setOpen,
	products,
	setQuery,
	navigate,
}) {
	useEffect(() => {
		document.body.style.overflow = open
			? "hidden"
			: "auto";

		const handleKeyDown = (event) => {
			if (event.key === "Escape") setOpen(false);
		};
		document.addEventListener(
			"keydown",
			handleKeyDown,
		);
		return () =>
			document.removeEventListener(
				"keydown",
				handleKeyDown,
			);
	}, [open]);

	return (
		<>
			{/* الخلفية (Overlay) تبقى Mounted دائماً */}
			<div
				className={[
					"fixed inset-0 z-50 bg-black/50 transition-opacity duration-300",
					"flex w-full h-screen", // ما نستخدم hidden أبداً
					open
						? "opacity-100 pointer-events-auto"
						: "opacity-0 pointer-events-none",
					className || "",
				].join(" ")}
				onMouseDown={() => setOpen(false)}
				onTouchStart={() => setOpen(false)}
				onKeyDown={(e) =>
					e.key === "Escape" && setOpen(false)
				}
				aria-hidden={!open}
			>
				{/* اللوحة (Panel) */}
				<div
					// إذا تبي تستخدم الـ Column تبعك بدل div ما في مشكلة
					onMouseDown={(e) => e.stopPropagation()}
					onTouchStart={(e) =>
						e.stopPropagation()
					}
					className={[
						"my-auto mx-auto flex w-fit h-fit max-h-[800px] gap-0",
						"transition-all duration-300 will-change-transform will-change-opacity",
						// حركات الدخول/الخروج
						open
							? "opacity-100 translate-y-0 scale-100"
							: "opacity-0 translate-y-2 scale-95",
					].join(" ")}
					role="dialog"
					aria-modal="true"
				>
					<Column className="lg:w-[450px] w-screen px-8 lg:px-0 gap-0">
						<input
							type="text"
							dir="rtl"
							className="w-full outline-0 h-10 rounded-t-md bg-slate-900 text-slate-300 px-6"
							placeholder="بحث..."
							autoFocus={open}
							onChange={(e) =>
								setQuery(e.target.value)
							}
						/>
						<Column
							dir="rtl"
							className={[
								"w-full max-h-[60vh] overflow-y-auto custom-scrollbar border-t border-slate-700",
								"rounded-b-md bg-slate-900 text-white px-3 flex justify-between",
								"transition-[opacity,transform] duration-300",
								open
									? "opacity-100 translate-y-0"
									: "opacity-0 -translate-y-1",
							].join(" ")}
						>
							<span className="text-muted-foreground/70 font-normal my-2 px-3">
								المنتجات
							</span>
							{products?.data?.map((product) => (
								<CommandItem
									key={product.id}
									className="dark:hover:bg-slate-700 cursor-pointer"
									onClick={() => {
										navigate(
											`/product/${product.id}`,
										);
									}}
								>
									<Row className="justify-between">
										<Column>
											<span>{product.name}</span>
											<span className="text-xs text-gray-500 dark:text-gray-400">
												{product.category.name}
											</span>
										</Column>
										<img
											src={`${
												import.meta.env
													.VITE_RABBIT_PI_BASE_URL
											}/uploads/${
												product.imgCover
											}`}
											alt={product.name}
											className="w-10 h-10 rounded-sm object-cover"
										/>
									</Row>
								</CommandItem>
							))}
							{/* <span className="text-muted-foreground/70 font-normal">
								التصنيفات
							</span>
							{categories?.data?.map(
								(category) => (
									<CommandItem
										key={category.id}
										onClick={() => {
											navigate(
												`/category/${category.id}`,
											);
										}}
									>
										<Row>
											<span>{category.name}</span>
										</Row>
									</CommandItem>
								),
							)} */}
						</Column>
					</Column>
				</div>
			</div>
		</>
	);
}
