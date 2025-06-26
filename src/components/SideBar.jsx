// import React from "react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Category } from "@/api/cateogryApi";

export default function SideBar({ Menubar }) {
	const [Subside, setSubside] = useState(false);
	const [Categories, setCategories] = useState(
		[],
	);
	const [openCategory, setOpenCategory] =
		useState(null); // Track which category is open

	const fetchCatSub = async () => {
		try {
			const res = await Category.getAll();
			setCategories(res);
		} catch (error) {}
	};

	useEffect(() => {
		fetchCatSub();
	}, []);

	const handleAccordion = (catId) => {
		setOpenCategory((prev) =>
			prev === catId ? null : catId,
		);
	};

	return (
		<div
			className="fixed mt-20 z-50 top-0 bottom-0 h-screen bg-white dark:bg-[#18181b] left-0 right-0 flex flex-col gap-0 transition-all duration-700 ease-in-out"
			style={{
				right: Menubar ? 0 : "-100%",
				left: Menubar ? 0 : "200%",
			}}
		>
			{Array.isArray(Categories) &&
			Categories.length > 0 ? (
				Categories.map((val, idx) => (
					<div
						key={val.id || idx}
						className="group transition-shadow duration-300 hover:shadow-lg overflow-hidden"
					>
						<button
							onClick={() =>
								handleAccordion(val.id)
							}
							className={`w-full flex flex-row-reverse justify-between items-center p-5 text-right font-Lato border-b-2 bg-gradient-to-l from-[#e6f4ff] via-white to-[#e6f4ff] dark:from-[#1a2630] dark:via-[#18181b] dark:to-[#1a2630] border-[#BFE3FF] dark:border-[#1a2630] focus:outline-none transition-colors duration-300 ${
								openCategory === val.id
									? "bg-[#f0f8ff] dark:bg-[#1a2630]"
									: "hover:bg-[#e6f4ff] dark:hover:bg-[#1a2630]"
							}`}
							style={{
								boxShadow:
									openCategory === val.id
										? "0 4px 16px 0 rgba(0, 149, 255, 0.10)"
										: undefined,
							}}
						>
							<span className="font-Lato text-[17px] my-auto text-black dark:text-white transition-colors duration-200 group-hover:text-[#0095FF] dark:group-hover:text-[#0095FF]">
								{val.name || "قسم"}
							</span>
							<span
								className={`inline-block transition-transform duration-300 ${
									openCategory === val.id
										? "rotate-90 text-[#0095FF]"
										: "text-gray-400 dark:text-gray-500"
								}`}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 18 18"
									fill="none"
									className="mr-2"
								>
									<path
										d="M12 16.5001L4.50003 9.00006L12 1.50006L13.3313 2.83131L7.16253 9.00006L13.3313 15.1688L12 16.5001Z"
										fill={
											openCategory === val.id
												? "#0095FF"
												: "currentColor"
										}
									/>
								</svg>
							</span>
						</button>
						{/* Accordion content: subcategories */}
						{openCategory === val.id &&
							val.subCategories &&
							val.subCategories.length > 0 && (
								<div className="bg-gradient-to-l from-[#e6f4ff] via-[#f8fafc] to-[#fff] dark:from-[#1a2630] dark:via-[#232326] dark:to-[#18181b] border-b border-[#BFE3FF] dark:border-[#1a2630] animate-fadeIn">
									{val.subCategories.map(
										(sub, subIdx) => (
											<Link
												key={sub.id}
												to={`/category/${val.id}/${sub.id}`}
												className="block text-right px-10 py-3 font-Lato text-[15px] text-gray-700 dark:text-gray-200 hover:bg-[#d0eaff] dark:hover:bg-[#1a2630] transition-colors duration-200 relative"
											>
												<span className="relative z-10">
													{sub.name || "قسم فرعي"}
												</span>
												{subIdx === 0 && (
													<span className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#0095FF] rounded-full opacity-70 animate-pulse"></span>
												)}
											</Link>
										),
									)}
								</div>
							)}
					</div>
				))
			) : (
				<div className="flex justify-center items-center h-full text-gray-400 dark:text-gray-500 text-lg font-Lato">
					لا توجد أقسام متاحة حاليا
				</div>
			)}

			<SubSide Subside={Subside} />
		</div>
	);
}

function SubSide({ Subside }) {
	return (
		<div
			className="flex flex-col text-right transition-all duration-300 ease-in-out"
			style={{
				display: Subside ? "flex" : "none",
				opacity: Subside ? 1 : 0,
				transform: Subside
					? "translateX(0)"
					: "translateX(-100%)",
				transitionProperty: "opacity, transform",
			}}
		>
			<a
				href=""
				className="font-Lato text-[16px] my-auto px-10  py-5 text-black border-b-2 border-[#EFEFEF]"
			>
				العربية
			</a>
			<a
				href=""
				className="font-Lato text-[16px] my-auto px-10  py-5 text-black"
			>
				English
			</a>
		</div>
	);
}
