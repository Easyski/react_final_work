import { LngLatLike } from "mapbox-gl";

export interface ILocation {
	name: string;
	detailedName: string;
	center: LngLatLike;
}

export type Coordinates = [number, number];
