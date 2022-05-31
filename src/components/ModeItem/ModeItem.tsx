import { FC } from "react";
import { useDispatch } from "react-redux";
import cn from "classnames";
import Tippy from "@tippyjs/react";

import { IModeItemTypes } from "./ModeItem.types";
import { setMode } from "../../store/slices";

import "tippy.js/dist/tippy.css"; // optional

const ModeItem: FC<IModeItemTypes> = ({ mode, selectedMode, children }) => {
	const dispatch = useDispatch();

	const handleSelectorClick = (mode: "points" | "tracks" | "routes") => {
		if (mode !== selectedMode) return dispatch(setMode(mode));
		dispatch(setMode(null));
	};

	const handleTooltip = () => {
		switch (mode) {
			case "points":
				return "Click on the map to add a marker.";
			case "tracks":
				return "Select two markers to create a track";
			case "routes":
				return "Select tracks to create your route";
		}
	};

	return (
		<Tippy content={handleTooltip()} duration={300}>
			<div
				onClick={() => handleSelectorClick(mode)}
				className={cn("modeItem flex", {
					"modeItem--selected": selectedMode === mode,
				})}
			>
				{children}
			</div>
		</Tippy>
	);
};

export default ModeItem;
