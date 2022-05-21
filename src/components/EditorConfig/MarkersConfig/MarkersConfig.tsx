import { FC } from "react";
import { useSelector } from "react-redux";
import MarkerOption from "./MarkerOption/MarkerOption";

import "./MarkersConfig.css";

const MarkersConfig: FC = () => {
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

	return <div className="markersContainer">{handleMarkersAdded()}</div>;
};

export default MarkersConfig;
