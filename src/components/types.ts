export interface ILocation {
	name: string;
	detailedName: string;
	center: Coordinates;
}

export type Coordinates = [number, number];
