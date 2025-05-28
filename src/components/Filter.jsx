export default function Filter() {
	return (
		<>
			<div className="flex flex-wrap m-auto justify-center gap-1 my-2 flex-row-reverse px-2">
				{<Link className="font-Lato p-2 border-[1px] rounded-lg">
					الكل
				</Link>}
				<span className="font-Lato p-2 border-[1px] rounded-lg">
					عملي
				</span>
				<span className="font-Lato p-2 border-[1px] rounded-lg">
					رسمي
				</span>
				<span className="font-Lato p-2 border-[1px] rounded-lg">
					بجامات نوم
				</span>
				<span className="font-Lato p-2 border-[1px] rounded-lg">
					داخلي
				</span>
			</div>
		</>
	);
}
