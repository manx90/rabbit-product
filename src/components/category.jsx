import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Category({
	name,
	all,
	idCat,
	idSub,
}) {
	return (
		<div className="my-[12px] border-b-blue-400 border">
			<CategoryHeader
				idCat={idCat}
				idSub={idSub}
				name={name}
				all={all}
			/>
		</div>
	);
}

Category.propTypes = {
	name: PropTypes.string.isRequired,
	all: PropTypes.bool,
};

Category.defaultProps = {
	all: true,
};

function CategoryHeader({
	idCat,
	idSub,
	name,
	all,
}) {
	return (
		<div className="flex justify-between items-center py-[8px] px-[12px]">
			<Link
				to={`/category/${idCat}/${idSub}`}
				className="flex items-center gap-[4px]"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 18 18"
					fill="none"
				>
					<mask
						id="mask0_1935_3170"
						style={{ maskType: "alpha" }}
						maskUnits="userSpaceOnUse"
						x="0"
						y="0"
						width="18"
						height="18"
					>
						<rect
							width="18"
							height="18"
							fill="#D9D9D9"
						/>
					</mask>
					<g mask="url(#mask0_1935_3170)">
						<path
							d="M12 16.5001L4.5 9.00006L12 1.50006L13.3313 2.83131L7.1625 9.00006L13.3313 15.1688L12 16.5001Z"
							fill="#0095FF"
						/>
					</g>
				</svg>
				<span className="font-Lato text-[#0095FF]">
					{all && "شاهد الكل"}
				</span>
			</Link>
			<span className="font-Lato">{name}</span>
		</div>
	);
}

CategoryHeader.propTypes = {
	name: PropTypes.string.isRequired,
	all: PropTypes.bool,
};

CategoryHeader.defaultProps = {
	all: true,
};
