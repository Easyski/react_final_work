export interface ILink {
	content: string;
	type: "arrow";
	onClick: () => void;
	extraStyle?: string;
}
