import { FC, useEffect, useCallback, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import mapboxgl, { Map } from "mapbox-gl";

import { setNewMarkers } from "../../store/slices";
import { Coordinates } from "../types";
import { INavigationTypes } from "./Navigation.types";

import "mapbox-gl/dist/mapbox-gl.css";

export const Navigation: FC<INavigationTypes> = () => {
	const dispatch = useDispatch();
	const zoom = useSelector((state: any) => state.map.zoom);
	const center = useSelector((state: any) => state.map.centerCoordinates);
	const editorMode = useSelector((state: any) => state.topbar.mode);
	const newMarkers = useSelector((state: any) => state.editor.newMarkers);

	const map = useRef<Map>();
	const mapContainer = useRef<HTMLDivElement | null>(null);
	const [newMarkerCoordinates, setNewMarkerCoordinates] =
		useState<Coordinates>();

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
			maxZoom: 15,
			minZoom: 5,
			doubleClickZoom: false,
			pitchWithRotate: false,
			dragRotate: false,
			logoPosition: "bottom-right",
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
			zoom: zoom,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [center]);

	/**
	 * Listens to the @param editorMode and adds an eventlistener on every
	 * click if the @param editorMode is set to "points".
	 * */
	useEffect(() => {
		if (!map.current) return;
		if (editorMode === "points") {
			map.current.on("click", callbackOnClick);
			return;
		}
		map.current.off("click", callbackOnClick);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editorMode]);

	/**
	 * This function is called whenver a new marker is placed on the map. It
	 * adds the coordinates to the @param newMarkers array in the store. This
	 * cannot be done in the @function handleMapClick because it is memoised
	 * and therefor unable to retrieve the previous markers.
	 */
	useEffect(() => {
		if (newMarkers[0]) {
			dispatch(setNewMarkers([...newMarkers, newMarkerCoordinates]));
			return;
		}
		dispatch(setNewMarkers([newMarkerCoordinates]));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newMarkerCoordinates]);

	/**
	 * Memoised function without dependencies, which means every reload it
	 * will be the exact same function in memory. This is a nescessity so that
	 * the eventlistener that handles the "click" event on the map can be
	 * toggled.
	 */
	const callbackOnClick = useCallback((evt: mapboxgl.MapMouseEvent) => {
		handleMapClick(evt);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	/**
	 * The function to be excecuted when the editor allows new markers to be
	 * placed.
	 * @param evt The Mapbox GL mouse-event from which we get the lat- and
	 * longtitude.
	 */
	const handleMapClick = (evt: mapboxgl.MapMouseEvent) => {
		if (!map.current) return;
		const { lng, lat } = evt.lngLat;
		new mapboxgl.Marker({ color: "rgb(221, 147, 147)" })
			.setLngLat([lng, lat])
			.addTo(map.current);

		setNewMarkerCoordinates([lng, lat]);
	};

	return (
		<div>
			<div ref={mapContainer} className="navigationContainer" />
		</div>
	);
};

export default Navigation;
