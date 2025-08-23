import styled from "tailwind-styled-components";
const Row = styled.div`
	flex flex-row gap-2 ;
`;

const Column = styled.div`
	flex flex-col gap-2 ;
`;

const ProductSlider = styled.div`
	min-h-[450px] snap-x flex gap-2 flex-row-reverse overflow-x-auto scroll-smooth p-[4px] w-full custom-scrollbar ;
`;

const Product = styled.div`
	relative w-full max-w-[200px] min-h-[320px] max-h-[450px] p-2 gap-2 flex flex-col justify-between bg-[#231f1f08] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 dark:shadow-lg shadow-sm rounded-md border border-transparent dark:border-gray-700  flex-shrink-0  hover:shadow-md  overflow-hidden;
`;
//hover:border-blue-500  dark:hover:border-blue-500

const ScrollColorImg = styled.div`
	flex snap-x  gap-1  p-[4px] custom-scrollbar overflow-x-auto
`;

const ImgProductSlider = styled.img`
	 h-[200px] w-full object-contain hover:scale-[1.05] transition-all duration-300 drop-shadow-md dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] ${(
			props,
		) =>
			props.imageloaded === "true"
				? "opacity-100"
				: "opacity-0"}
`;

const Span = styled.span`
	font-Lato text-right text-[14px] md:text-[18px]  text-black dark:text-white overflow-hidden text-ellipsis font-normal leading-normal whitespace-nowrap ;
`;

const ButtonCard = styled.button`
	bg-[#fefefe]  dark:bg-blue-700 w-full p-[4px] flex  border-1 border-[#ecebebf0] dark:border-blue-800 items-center justify-center gap-[4px] hover:dark:bg-blue-600 flex-row-reverse rounded-sm mx-auto shadow  transition-colors group ;
`;

const CommandItem = styled.div`
	p-2
	w-full
	text-white
	hover:bg-blue-500
	rounded-sm
	cursor-pointer
	transition-colors
	duration-300
`;

export {
	Row,
	Column,
	ButtonCard,
	Span,
	ProductSlider,
	Product,
	ScrollColorImg,
	ImgProductSlider,
	CommandItem,
};
