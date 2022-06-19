import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToggleSlider } from "react-toggle-slider";
import { BiTrash, BiX, BiMapPin } from "react-icons/bi";
import { toast } from "react-toastify";

import {
	setCenterCoordinates,
	setOverrideMarkerList,
	setZoom,
} from "@/store/slices";
import { IMarker } from "@/components/types";
import { removeMarkerFromList } from "@/hooks";

interface IMarkerOption {
	marker: IMarker;
	indexInList: number;
}

const MarkerOption: FC<IMarkerOption> = ({ marker, indexInList }) => {
	const dispatch = useDispatch();
	const markerList: any[] = useSelector(
		(state: any) => state.sidebar.markerList
	);
	const selectedMarkerIndex = useSelector(
		(state: any) => state.sidebar.selectedMarkerIndex
	);

	const [isGuide, setIsGuide] = useState<boolean>(false);

	/**
	 * Zooms in on the selected marker.
	 */
	const handleMarkerListClicked = () => {
		dispatch(setZoom(14));
		dispatch(setCenterCoordinates(marker.coordinates));
	};

	const handleCloseMarker = () => {
		const newMarkerList = removeMarkerFromList(marker, markerList);
		if (!newMarkerList) toast.error("The marker could not be removed!");
		dispatch(setOverrideMarkerList(newMarkerList));
	};

	const handleDeleteMarker = () => {
		console.log("Delete");
	};

	return (
		<div className="marker-option font-md">
			<input
				className="input italic"
				type="text"
				placeholder="Name (optional)"
				autoComplete="off"
			/>
			<div className="flex flex-h">
				<p>
					<span className={!isGuide ? "bold" : "regular"}>Main point</span> /
					<span className={isGuide ? "bold" : "regular"}>Guide</span>
				</p>
				<ToggleSlider
					onToggle={(toggle) => setIsGuide(toggle)}
					barHeight={20}
					barWidth={40}
					handleSize={12}
					barStyles={{ marginLeft: 20 }}
					handleStyles={{ marginLeft: 20 }}
					draggable={true}
				/>
			</div>
			<p>
				<span className="bold">Longitude: </span>
				{marker.coordinates.lng.toFixed(4)}
			</p>
			<p>
				<span className="bold">Latitude: </span>
				{marker.coordinates.lat.toFixed(4)}
			</p>
			<p>
				<span className="bold">Altitude: </span>
				{marker.coordinates.alt ? marker.coordinates.alt : 0}
			</p>
			<BiX
				className="icon-sidebar icon-sidebar-top pointer"
				onClick={handleCloseMarker}
			/>
			<BiMapPin
				className="icon-sidebar icon-sidebar-middle pointer"
				onClick={handleMarkerListClicked}
			/>
			<BiTrash
				className="icon-sidebar icon-sidebar-bottom pointer"
				onClick={handleDeleteMarker}
			/>
		</div>
	);
};

export default MarkerOption;
