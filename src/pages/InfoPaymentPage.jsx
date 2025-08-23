// import React from "react";
import Header from "@/components/Header";
import PaymentBox from "@/components/PaymentBox";
import InputPhone from "@/components/inputPhone";
import { Row } from "./../lib/css/Product";
export default function InfoPaymentPage({
	openInfo,
	setOpenInfo,
}) {
	return (
		<div
			className={`fixed top-0 left-0 w-full h-full bg-black/50 z-50 transition-all duration-300 ${
				open
					? "opacity-100 pointer-events-auto"
					: "opacity-0 pointer-events-none"
			}`}
			onClick={() => setOpen(false)}
		>
			<Inputs />
			<PaymentBox fix={false} />
		</div>
	);
}

function Inputs() {
	return (
		<div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900">
			<div className="mb-6">
				<h2 className="text-2xl font-bold text-gray-800 dark:text-white text-right mb-2">
					معلومات التوصيل
				</h2>
				<p className="text-gray-600 dark:text-gray-400 text-right text-sm">
					يرجى ملء جميع الحقول المطلوبة لإتمام
					عملية التوصيل
				</p>
			</div>

			<form className="space-y-6">
				<Row className="w-full gap-4">
					<div className="flex flex-col gap-3 w-full">
						<label
							htmlFor="name"
							className="font-Lato text-gray-700 dark:text-gray-300 font-medium text-right"
						>
							الاسم الكامل *
						</label>
						<input
							type="text"
							placeholder="ادخل الاسم الكامل"
							name="name"
							id="name"
							className="font-Lato border border-gray-300 dark:border-gray-600 p-3 rounded-lg bg-white dark:bg-gray-800 text-right placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
						/>
					</div>
					<div className="flex flex-col gap-3 w-full">
						<InputPhone />
					</div>
				</Row>

				<div className="flex flex-col gap-3">
					<label
						htmlFor="city"
						className="font-Lato text-gray-700 dark:text-gray-300 font-medium text-right"
					>
						المدينة *
					</label>
					<input
						type="text"
						placeholder="اختر المدينة"
						name="city"
						id="city"
						className="font-Lato border border-gray-300 dark:border-gray-600 p-3 rounded-lg bg-white dark:bg-gray-800 text-right placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
					/>
				</div>

				<div className="flex flex-col gap-3">
					<label
						htmlFor="village"
						className="font-Lato text-gray-700 dark:text-gray-300 font-medium text-right"
					>
						القرية
					</label>
					<input
						type="text"
						placeholder="ادخل اسم القرية (اختياري)"
						name="village"
						id="village"
						className="font-Lato border border-gray-300 dark:border-gray-600 p-3 rounded-lg bg-white dark:bg-gray-800 text-right placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
					/>
					<div className="flex items-start gap-2 mt-1">
						<svg
							className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fillRule="evenodd"
								d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
								clipRule="evenodd"
							/>
						</svg>
						<span className="font-Lato text-sm text-amber-600 dark:text-amber-400 text-right leading-relaxed">
							ملاحظة: إدخال اسم القرية يساعد في
							تسريع عملية التوصيل
						</span>
					</div>
				</div>

				<div className="flex flex-col gap-3">
					<label
						htmlFor="address"
						className="font-Lato text-gray-700 dark:text-gray-300 font-medium text-right"
					>
						العنوان التفصيلي *
					</label>
					<textarea
						placeholder="مثال: شارع فلسطين، بناية رقم 10، الطابق الثاني، شقة رقم 5"
						name="address"
						id="address"
						rows="3"
						className="font-Lato border border-gray-300 dark:border-gray-600 p-3 rounded-lg bg-white dark:bg-gray-800 text-right placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md resize-none"
					/>
					<div className="flex items-start gap-2 mt-1">
						<svg
							className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fillRule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
								clipRule="evenodd"
							/>
						</svg>
						<span className="font-Lato text-sm text-blue-600 dark:text-blue-400 text-right leading-relaxed">
							كلما كان العنوان أكثر تفصيلاً، كلما
							كان التوصيل أسرع وأدق
						</span>
					</div>
				</div>

				<div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border-l-4 border-blue-500">
					<div className="flex items-center gap-2 mb-2">
						<svg
							className="w-5 h-5 text-blue-500"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fillRule="evenodd"
								d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clipRule="evenodd"
							/>
						</svg>
						<span className="font-Lato font-medium text-gray-700 dark:text-gray-300 text-right">
							أمان معلوماتك
						</span>
					</div>
					<p className="font-Lato text-sm text-gray-600 dark:text-gray-400 text-right leading-relaxed">
						جميع المعلومات التي تدخلها محمية
						ومشفرة ولن يتم مشاركتها مع أطراف ثالثة
					</p>
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
