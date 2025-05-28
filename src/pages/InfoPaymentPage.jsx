// import React from "react";
import Header from "@/components/Header";
import PaymentBox from "@/components/PaymentBox";
export default function InfoPaymentPage() {
	return (
		<div className="flex flex-col mt-[80px]">
			<Header />
			<Inputs />
			<PaymentBox fix={false} />
			<Alerts />
		</div>
	);
}

function Inputs() {
	return (
		<div className="border-b-0 border-gray-400">
			<form>
				<div className="flex flex-col gap-2 p-[16px]">
					<label
						htmlFor=""
						className="font-Lato self-end"
					>
						الإسم
					</label>
					<input
						type="text"
						placeholder="ادخل الإسم"
						name=""
						id=""
						className="font-Lato border-2 p-[10px] rounded-xl border-gray-400 text-end  placeholder:self-end focus:outline-none"
					/>
				</div>
				<div className="flex flex-col gap-2 p-[16px]">
					<label
						htmlFor=""
						className="font-Lato self-end"
					>
						رقم الهاتف
					</label>
					<input
						type="text"
						placeholder="ادخل رقم الهاتف"
						name=""
						id=""
						className="font-Lato border-2 p-[10px] rounded-xl border-gray-400 text-end  placeholder:self-end focus:outline-none"
					/>
				</div>
				<div className="flex flex-col gap-2 p-[16px]">
					<label
						htmlFor=""
						className="font-Lato self-end"
					>
						{" "}
						المدينة
					</label>
					<input
						type="text"
						placeholder="الرجاء ادخال اسم المدينة"
						name=""
						id=""
						className="font-Lato border-2 p-[10px] rounded-xl border-gray-400 text-end  placeholder:self-end focus:outline-none"
					/>
				</div>
				<div className="flex flex-col gap-2 p-[16px]">
					<label
						htmlFor=""
						className="font-Lato self-end"
					>
						{" "}
						القرية
					</label>
					<input
						type="text"
						placeholder="الرجاء ادخال اسم القرية"
						name=""
						id=""
						className="font-Lato border-2 p-[10px] rounded-xl border-gray-400 text-end  placeholder:self-end focus:outline-none"
					/>
					<span className="font-Lato text-[12px] text-right  text-red-500">
						ملاحظة: من المهم ادخال اسم القرية اذا
						كنت من سكانها لاتمام اسرع عملية توصيل
					</span>
				</div>
				<div className="flex flex-col gap-2 p-[16px]">
					<label
						htmlFor=""
						className="font-Lato self-end"
					>
						{" "}
						عنوان تفصيلي
					</label>
					<input
						type="text"
						placeholder="الرجاء ادخال عنوان تفصيلي لمنطقة التوصيل"
						name=""
						id=""
						className="font-Lato border-2 p-[10px] rounded-xl border-gray-400 text-end  placeholder:self-end focus:outline-none"
					/>
				</div>
			</form>
		</div>
	);
}

function Alerts() {
	return (
		<div className="flex flex-col gap-4 mt-8 p-[16px] mb-8">
			<span className="font-Lato text-[#000]  text-end">
				: سياساتنا في العمل
			</span>
			<span className="font-Lato text-[#535353]  text-right max-w-[450px]">
				: الدفع والتوصيل
			</span>
			<span className="font-Lato text-[#535353]  text-right max-w-[450px] text-[12px]">
				ببساطة نقوم بايصال المنتج لغاية منزلك
				وتقوم بدفع الثمن لموظف التوصيل
			</span>
			<span className="font-Lato text-[#535353]  text-right max-w-[450px]">
				: التبديل
			</span>
			<span className="font-Lato text-[#535353]  text-right max-w-[450px] text-[12px]">
				ببساطة نقوم بإيصال الطلب إليك و تقوم بتسلم
				الطرد المراد تبديله ل موظف التوصيل{" "}
			</span>
			<span className="font-Lato text-[#535353]  text-right max-w-[450px] ">
				: الغاء الطلب
			</span>
			<span className="font-Lato text-[#535353]  text-right max-w-[450px] text-[12px]">
				ببساطة التواصل معنا عبر الواتساب لإلغاء
				الطلب{" "}
			</span>
		</div>
	);
}
