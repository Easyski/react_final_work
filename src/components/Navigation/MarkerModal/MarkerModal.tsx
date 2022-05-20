import { FC, useEffect, useRef } from "react";
import { batch, useDispatch } from "react-redux";
import mapboxgl, { Map } from "mapbox-gl";

import {
	setMarkerModal,
	setAllowNewMarker,
	setMode,
} from "../../../store/slices/editorSlice";
import { IMarkerModalTypes } from "./MarkerModal.types";

import "./MarkerModal.css";

const MarkerModal: FC<IMarkerModalTypes> = ({ center }) => {
	const dispatch = useDispatch();

	const map = useRef<Map>();
	const smallMapBox = useRef<HTMLDivElement | null>(null);

	/**
	 * Initialise map with set parameters
	 * ( Executed on startup )
	 */
	useEffect(() => {
		if (map.current || !smallMapBox.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: smallMapBox.current,
			style: "mapbox://styles/mapbox/streets-v9",
			center: center,
			zoom: 15,
			interactive: false,
		});
	});

	/**
	 * When the button that allows **A** new marker is clicked,
	 * this function will set the correct values in the store.
	 */
	const handleButtonClickNewMarker = () => {
		batch(() => {
			dispatch(setAllowNewMarker(true));
			dispatch(setMode("points"));
			dispatch(setMarkerModal(false));
		});
	};

	/**
	 * When the button that allows **NO** new marker is clicked,
	 * this function will set the correct values in the store.
	 */
	const handleButtonClickNoNewMarker = () => {
		dispatch(setAllowNewMarker(false));
		dispatch(setMarkerModal(false));
	};

	return (
		<div className="modalContainer">
			<div className="modalWrapper">
				<div ref={smallMapBox} className="modalSmallMapBox" />
				<button onClick={handleButtonClickNewMarker}>NEW MARKER</button>
				<button onClick={handleButtonClickNoNewMarker}>NO NEW MARKER</button>
			</div>
		</div>
	);
};

export default MarkerModal;
