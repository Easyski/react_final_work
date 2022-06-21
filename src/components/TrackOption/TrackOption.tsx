import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiMapPin, BiX, BiTrash } from "react-icons/bi";

import { ICoordinates, IMarker, ITrack } from "../types";
import {
	setCenterCoordinates,
	setOverrideTrackList,
	setZoom,
} from "@/store/slices";
import {
	findInList,
	findMarkersByTrack,
	removeFromList,
} from "@/hooks/useOperators";
import { setUpdateTrack } from "@/store/slices";

const TrackOption: FC<{
	track: ITrack;
	indexInList: number;
}> = ({ track, indexInList }) => {
	const dispatch = useDispatch();
	const markerList: IMarker[] = useSelector(
		(state: any) => state.marker.markerList
	);
	const trackList: ITrack[] = useSelector(
		(state: any) => state.track.trackList
	);

	const [markers, setMarkers] = useState<IMarker[]>();

	useEffect(() => {
		const trackMarkers = findMarkersByTrack(track, markerList);
		setMarkers(trackMarkers);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleMarkerClick = (index: number) => {
		const centerCoords: ICoordinates = {
			lng: track.coordinates[index][0],
			lat: track.coordinates[index][1],
		};
		dispatch(setCenterCoordinates(centerCoords));
		dispatch(setZoom(13));
	};

	const handleCloseMarker = () => {
		const newArray = removeFromList(track, trackList, "track") as ITrack[];
		dispatch(setOverrideTrackList(newArray));
	};

	const handleDeleteMarker = () => {};

	const handleInputChange = (e: any) => {
		const tempTrack = { ...track };
		tempTrack.name = e.target.value;
		const index = findInList(track, trackList, "track");
		if (index !== null) dispatch(setUpdateTrack([tempTrack, index]));
	};

	return (
		<div className="track-option font-md">
			<input
				className="input italic"
				type="text"
				placeholder="Name"
				autoComplete="off"
				onChange={handleInputChange}
				value={track.name}
			/>
			<p className="flex flex-h align-center">
				From{" "}
				<span className="italic marker-name">
					{markers && markers[0].name ? markers[0].name : "unnamed marker"}
				</span>
				<BiMapPin className="pointer" onClick={() => handleMarkerClick(0)} />
			</p>
			<p className="flex flex-h align-center">
				To{" "}
				<span className="italic marker-name">
					{markers && markers[1].name ? markers[1].name : "unnamed marker"}
				</span>
				<BiMapPin className="pointer" onClick={() => handleMarkerClick(1)} />
			</p>
			<BiX
				className="icon-sidebar icon-sidebar-top pointer"
				onClick={handleCloseMarker}
			/>
			<BiTrash
				className="icon-sidebar icon-sidebar-bottom pointer"
				onClick={handleDeleteMarker}
			/>
		</div>
	);
};

export default TrackOption;
