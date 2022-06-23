import { FC } from "react";
import { ITrackWithId } from "../types";
import { BiMoveVertical } from "react-icons/bi";

interface IRouteOption {
	track: ITrackWithId;
}

const RouteOption: FC<IRouteOption> = ({ track }) => {
	return (
		<div className="route-option font-md pointer border-box">
			<p>{track.name ? track.name : "unnamed route"}</p>
			<BiMoveVertical className="icon-sidebar icon-sidebar-middle pointer" />
		</div>
	);
};

export default RouteOption;
