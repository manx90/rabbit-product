import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import Badge, {
	badgeClasses,
} from "@mui/material/Badge";
import styled from "styled-components";
import SideBar from "@/components/SideBar";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "@/hooks/useCartRedux";
import SearchBox from "./SearchBox";
import Darkmode from "./Darkmode";
import { Column } from "@/lib/css/Product";

export default function Header({
	openInfo,
	setOpenInfo,
}) {
	const [Menubar, setMenubar] = useState(false);
	const [isDark, setIsDark] = useState(false);

	return (
		<Column>
			<div className="bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 flex flex-col shadow-sm dark:shadow-lg transition-all">
				<div className="flex align-center justify-between p-[16px] py-[6px] border-b border-[#D9D9D9] dark:border-gray-700/70 dark:text-white lg:px-32">
					<Link to="/">
						<img
							src={
								isDark
									? "/LogoTwo.svg"
									: "/logoOne.svg"
							}
							alt="Rabbit Products Logo"
							className=" w-32 md:w-42 lg:w-52 dark:invert drop-shadow-md mr-4"
						/>
					</Link>
					<div className="hidden md:flex items-center justify-center gap-[12px] w-full">
						<SearchBox className="w-2/4" />
					</div>
					<div className="flex items-center justify-center gap-[12px]">
						<IconButtonWithBadge
							openInfo={openInfo}
							setOpenInfo={setOpenInfo}
						/>
						<Darkmode />
						{!Menubar ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								onClick={() =>
									setMenubar(!Menubar)
								}
								className="lg:hidden "
							>
								<mask
									id="mask0_1920_6087"
									style={{ maskType: "alpha" }}
									maskUnits="userSpaceOnUse"
									x="0"
									y="0"
									width="24"
									height="24"
								>
									<rect
										width="24"
										height="24"
										fill="#D9D9D9"
									/>
								</mask>
								<g mask="url(#mask0_1920_6087)">
									<path
										d="M3 18V16H21V18H3ZM3 13V11H21V13H3ZM3 8V6H21V8H3Z"
										fill="#535353"
										className="dark:fill-white"
									/>
								</g>
							</svg>
						) : (
							<CloseIcon
								onClick={() =>
									setMenubar(!Menubar)
								}
								className="dark:text-white"
							/>
						)}
					</div>
				</div>
				<SideBar
					Menubar={Menubar}
					setMenubar={setMenubar}
				/>
			</div>
			<div className="flex md:hidden gap-[12px] w-full mb-2 px-2 ">
				<SearchBox
					ctrl={false}
					className="w-full bg-white dark:bg-gray-800"
				/>
			</div>
		</Column>
	);
}

const CartBadge = styled(Badge)`
	& .${badgeClasses.badge} {
		top: -12px;
		right: -6px;
		/* Light mode */
		background-color: #0095ff;
		color: #fff;
		/* Dark mode */
		@media (prefers-color-scheme: dark) {
			background-color: #232323;
			color: #fff;
			border: 1px solid #444;
		}
	}
`;
function IconButtonWithBadge({
	openInfo,
	setOpenInfo,
}) {
	const { totalQty } = useCart();
	return (
		<IconButton className="top-[2px] dark:text-white">
			<ShoppingCartIcon
				fontSize="medium"
				className="dark:text-white"
				onClick={() => {
					setOpenInfo(true);
				}}
			/>
			<CartBadge
				badgeContent={totalQty}
				color="primary"
				overlap="circular"
			/>
		</IconButton>
	);
}
