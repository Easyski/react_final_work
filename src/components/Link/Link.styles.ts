export interface ILink {
	content: string;
	type: "arrow" | "help" | "back" | "submit";
	onClick: () => void;
	extraStyle?: string;
	textStyle?: string;
}
