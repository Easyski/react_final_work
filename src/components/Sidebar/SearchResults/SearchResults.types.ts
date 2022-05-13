import { LngLatLike } from "mapbox-gl";
import { ILocation } from "../../types";

export interface ISearchResults {
	locations: ILocation[] | [];
	setCenter: (center: LngLatLike) => void;
}
