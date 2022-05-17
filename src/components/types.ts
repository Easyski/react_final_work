export interface ILocation {
	name: string;
	detailedName: string;
	center: ICoordinates;
}

export type ICoordinates = [number, number];
