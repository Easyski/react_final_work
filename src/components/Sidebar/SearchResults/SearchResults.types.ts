import { ICoordinates, ILocation } from "../../types";

export interface ISearchResults {
	locations: ILocation[] | [];
	setCenter: (center: ICoordinates) => void;
}
