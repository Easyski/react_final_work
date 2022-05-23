import { FC, useEffect } from "react";
import { useSelector } from "react-redux";

import { BiLocationPlus } from "react-icons/bi";
import { FaRoute } from "react-icons/fa";
import { RiGuideLine } from "react-icons/ri";

import ModeItem from "../ModeItem/ModeItem";

const Mode: FC = () => {
	const selectedMode = useSelector((state: any) => state.topbar.mode);

	useEffect(() => {
		console.log("Mode: selectedMode", selectedMode);
	}, [selectedMode]);

	return (
		<div className="mode flex-h">
			<ModeItem mode="points" selectedMode={selectedMode}>
				<BiLocationPlus />
			</ModeItem>
			<ModeItem mode="tracks" selectedMode={selectedMode}>
				<RiGuideLine />
			</ModeItem>
			<ModeItem mode="routes" selectedMode={selectedMode}>
				<FaRoute />
			</ModeItem>
		</div>
	);
};

export default Mode;
