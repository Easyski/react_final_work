import { LngLatLike } from "mapbox-gl";

export interface ISidebar {
	setMapCenter: (center: LngLatLike) => void;
}
