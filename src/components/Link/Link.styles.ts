export interface ILink {
	content: string;
	type: "arrow" | "help" | "back" | "submit" | "google" | "delete";
	onClick: () => void;
	extraStyle?: string;
	textStyle?: string;
}
