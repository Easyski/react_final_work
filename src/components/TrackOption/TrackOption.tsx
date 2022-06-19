import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiMapPin, BiX, BiTrash } from "react-icons/bi";

import { ICoordinates, ITrack } from "../types";
import {
	setCenterCoordinates,
	setOverrideTrackList,
	setZoom,
} from "@/store/slices";
import { removeFromList } from "@/hooks/useOperators";

const TrackOption: FC<{
	track: ITrack;
	indexInList: number;
}> = ({ track, indexInList }) => {
	const dispatch = useDispatch();
	const trackList: ITrack[] = useSelector(
		(state: any) => state.sidebar.trackList
	);

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
	const handleInputChange = (e: any) => {};

	return (
		<div className="track-option font-md">
			<input
				className="input italic"
				type="text"
				placeholder="Name"
				autoComplete="off"
				onChange={handleInputChange}
			/>
			<p className="flex flex-h align-center">
				From <span className="italic marker-name">{"unnamed marker"}</span>
				<BiMapPin className="pointer" onClick={() => handleMarkerClick(0)} />
			</p>
			<p className="flex flex-h align-center">
				To <span className="italic marker-name">{"unnamed marker"}</span>
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
