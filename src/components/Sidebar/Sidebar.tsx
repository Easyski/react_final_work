import { FC, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { MarkerOption } from "..";
import { ICoordinates } from "../types";

const Sidebar: FC = () => {
	const mode = useSelector((store: any) => store.topbar.mode);
	const markersToBeAdded = useSelector(
		(store: any) => store.sidebar.newMarkers
	);

	const scrollElement = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!scrollElement.current) return;
		scrollElement.current.scrollTop = scrollElement.current.scrollHeight;
	}, [markersToBeAdded]);

	const handleMarkersAdded = () => {
		if (!markersToBeAdded[0])
			return (
				<p className="light italic font-md text-center">
					You currently do no have any markers set.
				</p>
			);
		const markersAsElements = markersToBeAdded.map(
			(coordinates: ICoordinates, index: number) => {
				return <MarkerOption coordinates={coordinates} key={index} />;
			}
		);

		return markersAsElements;
	};

	return (
		<div className="sidebar container border-box">
			<p className="bold text-center">Markers to be placed</p>
			<div className="scroll-container" ref={scrollElement}>
				{handleMarkersAdded()}
			</div>
		</div>
	);
};

export default Sidebar;
