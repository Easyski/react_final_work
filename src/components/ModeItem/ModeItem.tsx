import { FC } from "react";
import { useDispatch } from "react-redux";
import cn from "classnames";

import { IModeItemTypes } from "./ModeItem.types";
import { setMode } from "../../store/slices";

const ModeItem: FC<IModeItemTypes> = ({ mode, selectedMode, children }) => {
	const dispatch = useDispatch();

	const handleSelectorClick = (mode: "points" | "tracks" | "routes") => {
		if (mode !== selectedMode) return dispatch(setMode(mode));
		dispatch(setMode(null));
	};

	return (
		<div
			className={cn("modeItem flex", {
				"modeItem--selected": selectedMode === mode,
			})}
			onClick={() => handleSelectorClick(mode)}
		>
			{children}
		</div>
	);
};

export default ModeItem;
