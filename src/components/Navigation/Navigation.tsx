import { FC, useEffect, useState } from "react";
import { INavigationTypes } from "./Navigation.types";
import ReactMapboxGl from "react-mapbox-gl";
import "./Navigation.css";
import "mapbox-gl/dist/mapbox-gl.css";

export const Navigation: FC<INavigationTypes> = ({
	fullScreen,
	startCoordinates = [4.34878, 50.85045],
	centerCoordinates,
}) => {
	const [center, setCenter] = useState<[number, number]>(
		startCoordinates as [number, number]
	);

	const Map = ReactMapboxGl({
		accessToken: process.env.REACT_APP_MAPBOX_KEY as string,
		minZoom: 5,
		maxZoom: 15,
		dragRotate: false,
		doubleClickZoom: false,
	});

	useEffect(() => {
		setCenter(centerCoordinates as [number, number]);
	}, [centerCoordinates]);

	const handleMapClick = (click: any) => {
		console.log(click);
	};

	return (
		<Map
			// eslint-disable-next-line react/style-prop-object
			style="mapbox://styles/mapbox/streets-v11"
			containerStyle={
				fullScreen
					? {
							height: "100vh",
							width: "100vw",
					  }
					: { height: "100px", width: "100px" }
			}
			onClick={(click) => handleMapClick(click)}
			center={center}
			zoom={[6]}
			movingMethod={"easeTo"}
			animationOptions={{
				duration: 1,
				animate: true,
			}}
		/>
	);
};

export default Navigation;
