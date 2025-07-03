import React from "react";

export default function StoryBar({
	stories,
	onOpenStory,
}) {
	// Array of beautiful gradient combinations
	const gradients = [
		"from-rose-400 via-pink-500 to-purple-600",
		"from-cyan-400 via-blue-500 to-indigo-600",
		"from-emerald-400 via-teal-500 to-cyan-600",
		"from-orange-400 via-red-500 to-pink-600",
		"from-violet-400 via-purple-500 to-fuchsia-600",
		"from-yellow-400 via-orange-500 to-red-600",
		"from-indigo-400 via-purple-500 to-pink-600",
		"from-green-400 via-emerald-500 to-teal-600",
	];

	return (
		<div
			dir="rtl"
			className="flex flex-row gap-4 px-4 py-3 overflow-x-auto custom-scrollbar scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 min-w-0"
		>
			{stories.map((story, index) => {
				const gradientClass =
					gradients[index % gradients.length];
				const hoverGradientClass =
					gradients[
						(index + 1) % gradients.length
					];

				return (
					<button
						key={story.id}
						onClick={() => onOpenStory(story)}
						className="flex flex-col items-center focus:outline-none flex-shrink-0 group transition-all duration-300 hover:scale-105"
					>
						<div className="relative">
							{/* Animated gradient border */}
							<div
								className={`rounded-full p-[3px] bg-gradient-to-tr ${gradientClass} animate-pulse group-hover:animate-none group-hover:bg-gradient-to-tr ${hoverGradientClass} transition-all duration-500 shadow-lg group-hover:shadow-xl group-hover:shadow-purple-500/25`}
							>
								<img
									src={story.user.avatar}
									alt={story.user.name}
									className="w-14 h-14 lg:w-24 lg:h-24 rounded-full object-cover shadow-md group-hover:shadow-lg transition-all duration-300"
								/>
							</div>
						</div>
						<span className="text-xs mt-2 text-gray-700 dark:text-gray-200 max-w-[60px] truncate font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
							{story.user.name}
						</span>
						{/* Hover indicator with matching gradient */}
						<div
							className={`w-8 h-1 bg-gradient-to-r ${gradientClass} rounded-full mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
						></div>
					</button>
				);
			})}
		</div>
	);
}
