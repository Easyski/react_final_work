import { ReactNode } from "react";
import { IMode } from "../types";

export interface IModeItemTypes {
	children: ReactNode;
	mode: IMode;
	selectedMode: IMode;
}
