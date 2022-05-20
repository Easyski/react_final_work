import { FC, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import mapboxgl, { Map } from "mapbox-gl";

import { INavigationTypes } from "./Navigation.types";
import {
	setMode,
	setMarkerModal,
	setAllowNewMarker,
} from "../../store/slices/editorSlice";
import MarkerModal from "./MarkerModal/MarkerModal";

import "./Navigation.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { Coordinates } from "../types";

export const Navigation: FC<INavigationTypes> = () => {
	const dispatch = useDispatch();
	const center = useSelector((state: any) => state.map.centerCoordinates);
	const editorMode = useSelector((state: any) => state.editor.mode);
	const allowNewMarker = useSelector(
		(state: any) => state.editor.allowNewMarker
	);
	const newMarkerPlaced = useSelector((state: any) => state.editor.markerModal);

	const [markerLocation, setMarkerLocation] = useState<Coordinates>();
	const map = useRef<Map>();
	const mapContainer = useRef<HTMLDivElement | null>(null);

	/**
	 * Initialise map with set parameters
	 * ( Executed on startup )
	 */
	useEffect(() => {
		if (map.current || !mapContainer.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/streets-v9",
			center: center,
			zoom: 6,
			maxZoom: 15,
			minZoom: 5,
			doubleClickZoom: false,
		});
	});

	/**
	 * Listens to @param center and moves the map to the new center.
	 */
	useEffect(() => {
		if (!map.current) return;
		map.current.flyTo({
			center,
			duration: 1500,
			zoom: 11.5,
		});
	}, [center]);

	/**
	 * Listens to the @param editorMode and adds an eventlistener on **1**
	 * click if the @param editorMode is set to "points".
	 * */
	useEffect(() => {
		if (!map.current) return;
		if (editorMode === "points") {
			map.current.once("click", handleMapClick);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editorMode]);

	/**
	 * Listens to the @param allowNewMarker and allows a new marker to
	 * be placed if the @param allowNewMarker is set to true by adding an
	 * eventlistener. It then resets the param to false.
	 **/

	useEffect(() => {
		if (!map.current || !allowNewMarker) return;

		console.log("Navigation allowNewMarker", allowNewMarker);

		map.current.once("click", handleMapClick);
		dispatch(setAllowNewMarker(false));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allowNewMarker]);

	/**
	 *The function to be excecuted when the editor allows new markers to be placed.
	 * @param evt The Mapbox GL mouse-event from which we get the lat- and longtitude.
	 */
	const handleMapClick = (evt: mapboxgl.MapMouseEvent) => {
		if (!map.current) return;
		const { lng, lat } = evt.lngLat;

		new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current);
		batch(() => {
			setMarkerLocation([lng, lat]);
			dispatch(setMode(null));
			dispatch(setMarkerModal(true));
		});
		console.log("Navigation: Map clicked");
	};

	return (
		<div>
			<div ref={mapContainer} className="navigationContainer__fullscreen" />
			{newMarkerPlaced && markerLocation && (
				<MarkerModal center={markerLocation} />
			)}
		</div>
	);
};

export default Navigation;
