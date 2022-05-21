import { FC } from "react";
import { IModeConfigTypes } from "./ModeConfig.types";

import { useDispatch } from "react-redux";
import { setMode } from "../../../store/slices";

import "./ModeConfig.scss";

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
