import { ReactNode } from "react";

export interface IModeItemTypes {
	children: ReactNode;
	mode: modes;
	selectedMode: modes | null;
}

type modes = "points" | "tracks" | "routes";
