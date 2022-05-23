import { FC } from "react";
import { useSelector } from "react-redux";

import { MarkerOption } from "..";

const Sidebar: FC = () => {
	const mode = useSelector((store: any) => store.topbar.mode);
	const markersToBeAdded = useSelector((store: any) => store.editor.newMarkers);

	const handleMarkersAdded = () => {
		if (!markersToBeAdded[0])
			return (
				<p className="light italic font-md text-center">
					You currently do no have any markers set.
				</p>
			);
		const markersAsElements = markersToBeAdded.map(
			(marker: any, index: number) => {
				return <MarkerOption center={marker} key={index} />;
			}
		);

		return markersAsElements;
	};

	return (
		<div className="sidebar container border-box">
			<p className="bold text-center">Markers to be placed</p>
			<div className="scroll-container">{handleMarkersAdded()}</div>
		</div>
	);
};

export default Sidebar;
