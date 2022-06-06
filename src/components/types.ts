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
