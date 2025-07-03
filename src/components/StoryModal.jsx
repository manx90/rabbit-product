import React, {
	useEffect,
	useRef,
	useState,
} from "react";

export default function StoryModal({
	story,
	onClose,
	onLike,
}) {
	const [progress, setProgress] = useState(0);
	const timerRef = useRef();
	const DURATION = 5000; // 5 seconds

	useEffect(() => {
		setProgress(0);
		timerRef.current = setInterval(() => {
			setProgress((p) => {
				if (p >= 100) {
					clearInterval(timerRef.current);
					onClose();
					return 100;
				}
				return p + 2;
			});
		}, DURATION / 50);
		return () => clearInterval(timerRef.current);
	}, [story, onClose]);

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 ">
			{/* Progress Bar */}
			<div className="absolute top-0 left-0 w-full h-1.5">
				<div
					className="h-full bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500 transition-all rounded"
					style={{ width: `${progress}%` }}
				/>
			</div>
			{/* Top Controls */}
			<div className="absolute top-0 left-0 w-full flex items-center justify-between px-6 pt-6 z-10">
				<div className="flex items-center gap-3 bg-black/40 px-3 py-2 rounded-full">
					<div className="p-[2.5px] bg-gradient-to-tr from-pink-500 via-yellow-400 to-purple-500 rounded-full">
						<img
							src={story.user.avatar}
							alt={story.user.name}
							className="w-12 h-12 rounded-full border-2 border-white object-cover"
						/>
					</div>
					<span className="font-semibold text-white text-lg drop-shadow">
						{story.user.name}
					</span>
				</div>
				<button
					onClick={onClose}
					className="text-white bg-black/40 hover:bg-black/70 rounded-full p-2 text-2xl font-bold focus:outline-none ml-2"
					aria-label="Close"
				>
					&times;
				</button>
			</div>
			{/* Story Content */}
			<div className="flex flex-1 px-10 items-center justify-center w-full h-full">
				{story.content.type === "image" ? (
					<img
						src={story.content.url}
						alt="story"
						className=" max-h-[95vh] rounded-xl shadow-2xl border-2 border-white "
						style={{ objectPosition: "center" }}
					/>
				) : (
					<video
						src={story.content.url}
						controls
						autoPlay
						className="w-[95vw] h-[95vh] max-w-[1200px] max-h-[95vh] rounded-xl shadow-2xl border-2 border-white object-cover"
						style={{ objectPosition: "center" }}
					/>
				)}
			</div>
			{/* Bottom Controls */}
			<div className="absolute bottom-0 left-0 w-full flex flex-col items-center pb-8 z-10">
				<button
					onClick={() => onLike(story.id)}
					className={`flex items-center gap-2 px-8 py-3 rounded-full text-lg font-semibold shadow-lg focus:outline-none transition-all ${
						story.liked
							? "bg-pink-500 text-white scale-110"
							: "bg-white/80 text-pink-600 hover:bg-pink-100"
					}`}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill={
							story.liked
								? "currentColor"
								: "none"
						}
						viewBox="0 0 24 24"
						stroke="currentColor"
						className={`w-7 h-7 ${
							story.liked ? "animate-pulse" : ""
						}`}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
						/>
					</svg>
					{story.liked ? "Liked" : "Like"}
				</button>
				<div
					className="w-16 h-1 bg-gray-400 rounded-full mt-6 opacity-70 cursor-pointer"
					onClick={onClose}
					title="Close"
				/>
			</div>
		</div>
	);
}
