import { FC } from "react";
import { useSelector } from "react-redux";

import { StyledText, MarkerOption } from "..";

const Sidebar: FC = () => {
	const markersToBeAdded = useSelector((store: any) => store.editor.newMarkers);

	const handleMarkersAdded = () => {
		if (!markersToBeAdded[0]) return;
		const markersAsElements = markersToBeAdded.map(
			(marker: any, index: number) => {
				return <MarkerOption center={marker} key={index} />;
			}
		);

		return markersAsElements;
	};

	return (
		<div className="sidebar container">
			<StyledText content="Markers to be placed" type="p" bold italic />

			{handleMarkersAdded()}
		</div>
	);
};

export default Sidebar;
