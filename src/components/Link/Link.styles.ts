export interface ILink {
	content: string;
	type: "arrow" | "help" | "back" | "submit" | "google";
	onClick: () => void;
	extraStyle?: string;
	textStyle?: string;
}
