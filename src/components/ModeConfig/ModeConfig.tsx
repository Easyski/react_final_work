import { FC } from "react";
import { useDispatch } from "react-redux";

import { IModeConfigTypes } from "./ModeConfig.types";
import { setMode } from "../../store/slices";

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
