import { ReactNode } from "react";

export interface IModeConfigTypes {
	children: ReactNode;
	mode: modes;
	selectedMode: modes | null;
}

type modes = "points" | "tracks" | "routes";
