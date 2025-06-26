import {
	useId,
	useEffect,
	useState,
} from "react";
import { MoonIcon, SunIcon } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const THEME_KEY = "theme-mode";

function getInitialTheme() {
	if (typeof window === "undefined") return false;
	const saved = localStorage.getItem(THEME_KEY);
	if (saved === "dark") return true;
	if (saved === "light") return false;
	// System preference
	return (
		window.matchMedia &&
		window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches
	);
}

export default function Darkmode() {
	const id = useId();
	const [checked, setChecked] = useState(
		getInitialTheme,
	);

	// Effect to update html class and localStorage
	useEffect(() => {
		const html = document.documentElement;
		if (checked) {
			html.classList.add("dark");
			localStorage.setItem(THEME_KEY, "dark");
		} else {
			html.classList.remove("dark");
			localStorage.setItem(THEME_KEY, "light");
		}
	}, [checked]);

	return (
		<div>
			<div className="relative inline-grid h-9 grid-cols-[1fr_1fr] items-center text-sm font-medium">
				<Switch
					id={id}
					checked={checked}
					onCheckedChange={setChecked}
					className="peer data-[state=unchecked]:bg-input/50 absolute inset-0 h-[inherit] w-auto [&_span]:z-10 [&_span]:h-full [&_span]:w-1/2 [&_span]:transition-transform [&_span]:duration-300 [&_span]:ease-[cubic-bezier(0.16,1,0.3,1)] [&_span]:data-[state=checked]:translate-x-full [&_span]:data-[state=checked]:rtl:-translate-x-full"
				/>
				<span className="pointer-events-none relative ms-0.5 flex min-w-8 items-center justify-center text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:invisible peer-data-[state=unchecked]:translate-x-full peer-data-[state=unchecked]:rtl:-translate-x-full">
					<MoonIcon
						size={16}
						aria-hidden="true"
					/>
				</span>
				<span className="peer-data-[state=checked]:text-background pointer-events-none relative me-0.5 flex min-w-8 items-center justify-center text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:-translate-x-full peer-data-[state=unchecked]:invisible peer-data-[state=checked]:rtl:translate-x-full">
					<SunIcon size={16} aria-hidden="true" />
				</span>
			</div>
			<Label htmlFor={id} className="sr-only">
				Labeled switch
			</Label>
		</div>
	);
}
