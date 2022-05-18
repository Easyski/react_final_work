import { FC, useEffect, useRef } from "react";
import { INavigationTypes } from "./Navigation.types";
import { useSelector } from "react-redux";
import mapboxgl, { Map } from "mapbox-gl";

import "./Navigation.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { useDispatch } from "react-redux";
import { setMode } from "../../store/slices/editorSlice";

export const Navigation: FC<INavigationTypes> = () => {
	const dispatch = useDispatch();
	const center = useSelector((state: any) => state.map.centerCoordinates);
	const editorMode = useSelector((state: any) => state.editor.mode);

	const map = useRef<Map>();
	const mapContainer = useRef<HTMLDivElement | null>(null);

	/**
	 * Initialise map with set parameters
	 * ( Executed on startup )
	 */
	useEffect(() => {
		if (map.current || !mapContainer.current) return; // initialize map only once
		console.log("map init, center:", center);
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
	 * Listens to the @param editorMode and allows a new marker to
	 * be placed if the @param editorMode is set to "points". It then
	 * resets the editorMode to "null".
	 * */
	useEffect(() => {
		if (editorMode !== "points" || !map.current) return;
		map.current.once("click", handleMapClick);
		dispatch(setMode("null"));
	}, [dispatch, editorMode]);

	/**
	 *The function to be excecuted when the editor allows new markers to be placed.
	 * @param evt The Mapbox GL mouse-event from which we get the lat- and longtitude.
	 */
	const handleMapClick = (evt: mapboxgl.MapMouseEvent) => {
		if (!map.current) return;
		const { lng, lat } = evt.lngLat;

		new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current);
	};

	return (
		<div>
			<div ref={mapContainer} className="navigationContainer__fullscreen" />
			{/* <PointModal /> */}
		</div>
	);
};

export default Navigation;
