import { FC, useEffect, useState } from "react";
import { INavigationTypes } from "./Navigation.types";
import Map from "react-map-gl";
import "./Navigation.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { ICoordinates } from "../types";

export const Navigation: FC<INavigationTypes> = ({
	fullScreen,
	startCoordinates = [10.12886, 47.264923],
	centerCoordinates,
}) => {
	const [center, setCenter] = useState<ICoordinates>(startCoordinates);

	useEffect(() => {
		if (centerCoordinates) setCenter(centerCoordinates);
	}, [centerCoordinates]);

	useEffect(() => {
		console.log("center", center);
	}, [center]);

	const handleMapClick = async (event: any) => {
		const { lat, lng } = await event.lngLat;
		setCenter([lng, lat]);
	};

	return (
		<Map
			mapStyle="mapbox://styles/mapbox/streets-v11"
			style={
				fullScreen
					? {
							height: "100vh",
							width: "100vw",
					  }
					: { height: "100px", width: "100px" }
			}
			onClick={handleMapClick}
			initialViewState={{
				zoom: 6,
				longitude: center[0],
				latitude: center[1],
			}}
			minZoom={5}
			maxZoom={15}
			maxPitch={0}
			doubleClickZoom={false}
		/>
	);
};

export default Navigation;
