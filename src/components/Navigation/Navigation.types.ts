import { LngLatLike } from "mapbox-gl";

export interface INavigationTypes {
	fullScreen?: true;
	centerCoordinates?: LngLatLike;
	startCoordinates?: LngLatLike;
}
