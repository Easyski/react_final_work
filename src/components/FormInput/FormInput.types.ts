import { HTMLInputTypeAttribute } from "react";

export interface IFormInput {
	type: HTMLInputTypeAttribute;
	title: string;
	required?: true;
	extraStyle?: string;
	value?: string;
	onChange: (value: string) => void;
}
