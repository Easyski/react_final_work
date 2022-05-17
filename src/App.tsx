import mapboxgl from "mapbox-gl";
import { FC, useState } from "react";
import { Navigation, Sidebar } from "./components";
import { ICoordinates } from "./components/types";

export const App: FC = () => {
	const [mapCenter, setMapCenter] = useState<ICoordinates>();
	mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY as string;

	return (
		<div>
			<Navigation fullScreen centerCoordinates={mapCenter} />
			<Sidebar setMapCenter={(center: ICoordinates) => setMapCenter(center)} />
		</div>
	);
};
