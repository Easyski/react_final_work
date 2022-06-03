import { HTMLInputTypeAttribute } from "react";

export interface IInput {
	value?: string;
	label: string;
	readOnly?: true;
	extraStyle?: string;
	type: HTMLInputTypeAttribute;
	onSubmit?: (value: string) => void;
}
