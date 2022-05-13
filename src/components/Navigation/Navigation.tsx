import { FC, useEffect, useRef } from "react";
import mapboxgl, { Map } from "mapbox-gl";
import { INavigationTypes } from "./Navigation.types";
import "./Navigation.css";

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
		if (!map.current || !centerCoordinates) return;
		map.current.flyTo({ center: centerCoordinates, zoom: 14 });
	}, [centerCoordinates]);

	const handleMapClick = (press: any) => {
		console.log(press);
	};

	return (
		<div
			ref={mapContainer}
			className={fullScreen && "map-container__fullscreen"}
			onClick={(press) => handleMapClick(press)}
		/>
	);
};

export default Navigation;
