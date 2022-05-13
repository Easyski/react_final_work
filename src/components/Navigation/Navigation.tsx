import { FC, useEffect, useRef } from "react";
import mapboxgl, { LngLatLike, Map } from "mapbox-gl";
import { INavigationTypes } from "./Navigation.types";
import "./Navigation.css";

mapboxgl.accessToken =
	"pk.eyJ1Ijoid2hlaXJzdHJhdGUiLCJhIjoiY2wwenRlNnM1MDVlMjNjbXN1bG1rMmw4cSJ9.iINJllchmyCz1jksG_NFFw";

export const Navigation: FC<INavigationTypes> = ({
	fullScreen,
	startCoordinates = [4.34878, 50.85045],
	centerCoordinates,
}) => {
	const mapContainer = useRef<HTMLDivElement>(null);
	const map = useRef<Map | null>(null);

	useEffect(() => {
		if (map.current || !mapContainer.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/streets-v11",
			center: startCoordinates,
			zoom: 6,
		});
	});

	useEffect(() => {
		setNewCoordinates();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [centerCoordinates]);

	const setNewCoordinates = () => {
		if (!map.current || !centerCoordinates) return;
		map.current.flyTo({ center: centerCoordinates, zoom: 14 });
	};

	return (
		<div
			ref={mapContainer}
			className={fullScreen && "map-container__fullscreen"}
		/>
	);
};

export default Navigation;
