import { HTMLInputTypeAttribute } from "react";

export interface IInput {
	value?: string;
	label: string;
	readOnly?: true;
	type: HTMLInputTypeAttribute;
}
