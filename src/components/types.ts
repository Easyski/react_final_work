import { Position } from "geojson";

export interface ILocation {
	name: string;
	detailedName: string;
	coordinates: ICoordinates;
}

export interface ICoordinates {
	lat: number;
	lng: number;
	alt?: number;
}

export type IMode = "points" | "tracks" | "routes" | null;

export interface IMarker {
	name: string;
	isUsed: boolean;
	coordinates: ICoordinates;
}
export interface ITrack {
	name: string;
	isUsed: boolean;
	coordinates: Position[];
}

export interface ITrackWithId extends ITrack {
	id: number;
}

export interface IRoute {
	name: string;
	isUsed: boolean;
	coordinates: ICoordinates;
}
