import { FC, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { MarkerOption } from "@/components";
import { ICoordinates } from "@/components/types";

const Sidebar: FC = () => {
	// const mode = useSelector((store: any) => store.topbar.mode);
	const markersToBeAdded = useSelector(
		(store: any) => store.sidebar.markerList
	);

	const scrollElement = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!scrollElement.current) return;
		scrollElement.current.scrollTop = scrollElement.current.scrollHeight;
	}, [markersToBeAdded]);

	const handleMarkersAdded = () => {
		if (!markersToBeAdded[0])
			return (
				<p className="light italic font-md text-center margin-top-lg">
					Click a marker to view it's stats or add one via the control panel.
				</p>
			);
		const markersAsElements = markersToBeAdded.map(
			(coordinates: ICoordinates, index: number) => {
				return (
					<MarkerOption
						coordinates={coordinates}
						key={index}
						indexInList={index}
					/>
				);
			}
		);

		return markersAsElements;
	};

	return (
		<div className="sidebar border-box">
			<h3 className="title bold font-lg text-center">
				Recently watched markers
			</h3>
			<p className="subtitle thin italic font-sm text-center">
				Click a marker in the list to focus
			</p>
			<div className="scroll-container" id="scrollElement" ref={scrollElement}>
				{handleMarkersAdded()}
			</div>
		</div>
	);
};

export default Sidebar;
