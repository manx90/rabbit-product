import {
	FaFacebook,
	FaInstagram,
	FaTiktok,
	FaWhatsapp,
} from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

import { Column, Row } from "@/lib/css/Product";

export default function Footer() {
	return (
		<div className="bg-[#000000] flex flex-col gap-[12px] px-[16px] pt-[40px] pb-[12px]">
			<Column className="items-center gap-4">
				<img
					className="w-56"
					src="/LogoTwo.svg"
					alt=""
				/>
				<Row>
					<FaFacebook className="w-8 h-8 text-white hover:text-blue-500 hover:scale-110 transition-all duration-200 cursor-pointer" />
					<FaInstagram className="w-8 h-8 text-white hover:text-pink-500 hover:scale-110 transition-all duration-200 cursor-pointer" />
					<FaTiktok className="w-8 h-8 text-white hover:text-white hover:scale-110 transition-all duration-200 cursor-pointer" />
					<FaWhatsapp className="w-8 h-8 text-white hover:text-green-500 hover:scale-110 transition-all duration-200 cursor-pointer" />
				</Row>

				<Row
					dir="rtl"
					className="justify-center group cursor-pointer hover:scale-[1.009] transition-all duration-400 mt-4"
				>
					<IoLocationSharp className="md:flex hidden my-auto w-8 h-8 group-hover:text-yellow-500  cursor-pointer" />
					<span className="font-Lato text-right text-[16px] md:text-[20px] text-[#FAFAFA]  ">
						موقعنا:
					</span>
					<span className="font-Lato text-right text-[16px] md:text-[20px] text-[#FAFAFA]">
						جنين _ شارع الحسبة _ مركز النفاع
						التجاري الجديد _ أبو غالي سنتر
					</span>
				</Row>
			</Column>
			{/* <span className="font-Lato text-right justify-self-end text-[14px] text-[#FAFAFA]">
				:موقعنا
			</span>
			<span className="font-Lato text-right text-[14px] text-[#FAFAFA]">
				جنين _ شارع الحسبة _ مركز النفاع التجاري
				الجديد _ أبو غالي سنتر
			</span> */}

			<div className="flex flex-row-reverse justify-center border-t border-white/10 pt-4">
				<span className="text-center text-[12px] font-Lato opacity-50 py-[4px] px-[6px] text-[#FAFAFA] align-right">
					{" "}
					© جميع الحقوق محفوظة 2025
				</span>
			</div>
		</div>
	);
}
