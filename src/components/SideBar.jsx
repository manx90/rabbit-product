// import React from "react";

import { useState } from "react";

export default function SideBar({ Menubar }) {
	const [Subside, setSubside] = useState(false);

	return (
		<div
			className="fixed mt-16 z-50 top-0 bottom-0 h-screen bg-white left-0 right-0 flex flex-col transition-all duration-700 ease-in-out"
			style={{
				right: Menubar ? 0 : "-100%",
				left: Menubar ? 0 : "200%",
			}}
		>
			<a
				href="#"
				className="flex flex-row-reverse justify-between p-5 text-right font-Lato border-b-2 bg-white border-[#EFEFEF]"
			>
				<span className="font-Lato text-[16px] my-auto text-black">
					قسم الرجالي
				</span>
				<span className="inline-block">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 18 18"
						fill="none"
						className="mr-2"
					>
						<path
							d="M12 16.5001L4.50003 9.00006L12 1.50006L13.3313 2.83131L7.16253 9.00006L13.3313 15.1688L12 16.5001Z"
							fill="black"
						/>
					</svg>
				</span>
			</a>
			<a
				href="#"
				className="flex flex-row-reverse justify-between p-5 text-right font-Lato border-b-2 bg-white border-[#EFEFEF]"
			>
				<span className="font-Lato text-[16px] my-auto text-black">
					قسم الرضعي
				</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 18 18"
					fill="none"
					className="mr-2"
				>
					<path
						d="M12 16.5001L4.50003 9.00006L12 1.50006L13.3313 2.83131L7.16253 9.00006L13.3313 15.1688L12 16.5001Z"
						fill="black"
					/>
				</svg>
			</a>
			<a
				href="#"
				className="flex flex-row-reverse justify-between p-5 text-right font-Lato border-b-2 bg-white border-[#EFEFEF]"
			>
				<span className="font-Lato text-[16px] my-auto text-black">
					قسم الاطفال
				</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 18 18"
					fill="none"
					className="mr-2"
				>
					<path
						d="M12 16.5001L4.50003 9.00006L12 1.50006L13.3313 2.83131L7.16253 9.00006L13.3313 15.1688L12 16.5001Z"
						fill="black"
					/>
				</svg>
			</a>
			<a
				href="#"
				className="flex flex-row-reverse justify-between p-5 text-right font-Lato border-b-2 bg-white border-[#EFEFEF]"
			>
				<span className="font-Lato text-[16px] my-auto text-black">
					قسم النساء
				</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 18 18"
					fill="none"
					className="mr-2"
				>
					<path
						d="M12 16.5001L4.50003 9.00006L12 1.50006L13.3313 2.83131L7.16253 9.00006L13.3313 15.1688L12 16.5001Z"
						fill="black"
					/>
				</svg>
			</a>
			<a
				href="#"
				onClick={() => setSubside(!Subside)}
				className="flex flex-row-reverse justify-between p-5 text-right font-Lato border-b-2 bg-white border-[#EFEFEF]"
			>
				<span className="font-Lato text-[16px] my-auto text-black">
					قسم الرجالي
				</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 18 18"
					fill="none"
					className="mr-2"
				>
					<path
						d="M12 16.5001L4.50003 9.00006L12 1.50006L13.3313 2.83131L7.16253 9.00006L13.3313 15.1688L12 16.5001Z"
						fill="black"
					/>
				</svg>
			</a>
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
