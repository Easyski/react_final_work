import { FC } from "react";
import { IModeConfigTypes } from "./ModeConfig.types";

import "./ModeConfig.css";
import { useDispatch } from "react-redux";
import { setMode } from "../../../store/slices";

const ModeConfig: FC<IModeConfigTypes> = ({ mode, selectedMode, children }) => {
	const dispatch = useDispatch();

	const handleSelectorClick = (mode: "points" | "tracks" | "routes") => {
		if (mode !== selectedMode) return dispatch(setMode(mode));
		dispatch(setMode(null));
	};

	return (
		<div
			className={
				selectedMode === mode
					? "editorSelector editorSelected"
					: "editorSelector"
			}
			onClick={() => handleSelectorClick(mode)}
		>
			{children}
		</div>
	);
};

export default ModeConfig;
