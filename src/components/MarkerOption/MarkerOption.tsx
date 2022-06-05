import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToggleSlider } from "react-toggle-slider";
import { BiTrash, BiX, BiExit } from "react-icons/bi";
import { toast } from "react-toastify";
import cn from "classnames";

import {
	setCenterCoordinates,
	setMarkerList,
	setZoom,
} from "../../store/slices";
import { ICoordinates } from "../types";
import { removeMarkerFromList } from "../../hooks";

interface IMarkerOption {
	coordinates: ICoordinates;
	indexInList: number;
}

const MarkerOption: FC<IMarkerOption> = ({ coordinates, indexInList }) => {
	const dispatch = useDispatch();
	const markerList: any[] = useSelector(
		(state: any) => state.sidebar.markerList
	);
	const selectedMarkerIndex = useSelector(
		(state: any) => state.sidebar.selectedMarkerIndex
	);

	const [isGuide, setIsGuide] = useState<boolean>(false);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);

	useEffect(() => {
		if (indexInList === selectedMarkerIndex) {
			setIsPlaying(true);
		}
	}, [indexInList, selectedMarkerIndex]);

	useEffect(() => {
		console.log("isPlaying", isPlaying);
		if (isPlaying) setIsPlaying(false);
	}, [isPlaying]);
	/**
	 * Zooms in on the selected marker.
	 */
	const handleMarkerListClicked = () => {
		dispatch(setZoom(14));
		dispatch(setCenterCoordinates(coordinates));
	};

	const handleCloseMarker = () => {
		const newMarkerList = removeMarkerFromList(coordinates, markerList);
		if (!newMarkerList) toast.error("The marker could not be removed!");
		dispatch(setMarkerList(newMarkerList));
	};

	const handleDeleteMarker = () => {
		console.log("Delete");
	};

	return (
		<div
			className={cn("marker-option font-md", {
				"animate__animated animate__flash": isPlaying,
			})}
		>
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
				{coordinates.lng.toFixed(4)}
			</p>
			<p>
				<span className="bold">Latitude: </span>
				{coordinates.lat.toFixed(4)}
			</p>
			<p>
				<span className="bold">Altitude: </span>
				{coordinates.alt ? coordinates.alt.toFixed(4) : 0}
			</p>
			<BiX className="icon icon-close pointer" onClick={handleCloseMarker} />
			<BiExit
				className="icon icon-exit pointer"
				onClick={handleMarkerListClicked}
			/>
			<BiTrash
				className="icon icon-delete pointer"
				onClick={handleDeleteMarker}
			/>
		</div>
	);
};

export default MarkerOption;
