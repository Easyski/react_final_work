import mapboxgl from "mapbox-gl";
import { LngLatLike } from "mapbox-gl";
import { FC, useState } from "react";
import { Navigation, Sidebar } from "./components";

export const App: FC = () => {
	const [mapCenter, setMapCenter] = useState<LngLatLike>();
	mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY as string;

	return (
		<div>
			<Navigation fullScreen centerCoordinates={mapCenter} />
			<Sidebar setMapCenter={(center: LngLatLike) => setMapCenter(center)} />
		</div>
	);
};
