import { FC } from "react";
import { useSelector } from "react-redux";

import { BiLocationPlus, BiTrip } from "react-icons/bi";
import { RiGuideLine } from "react-icons/ri";

import { ModeItem } from "@/components";
import { IMode } from "@/components/types";

const Mode: FC = () => {
	const selectedMode: IMode = useSelector((state: any) => state.topbar.mode);

	return (
		<div className="mode flex flex-h">
			<ModeItem mode="points" selectedMode={selectedMode}>
				<BiLocationPlus />
			</ModeItem>
			<ModeItem mode="tracks" selectedMode={selectedMode}>
				<RiGuideLine />
			</ModeItem>
			<ModeItem mode="routes" selectedMode={selectedMode}>
				<BiTrip />
			</ModeItem>
		</div>
	);
};

export default Mode;
