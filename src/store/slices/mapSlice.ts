import { createSlice } from "@reduxjs/toolkit";
import { ICoordinates } from "@/components/types";

interface IInitialState {
	centerCoordinates: ICoordinates;
	zoom: number;
	locationName: string;
}

const initialState: IInitialState = {
	centerCoordinates: { lng: 14.34878, lat: 50.85045 },
	zoom: 6,
	locationName: "",
};

export const mapSlice = createSlice({
	name: "mapSlice",
	initialState,
	reducers: {
		setCenterCoordinates: (state, action) => {
			state.centerCoordinates = action.payload;
		},
		setZoom: (state, action) => {
			state.zoom = action.payload;
		},
		setLocationName: (state, action) => {
			state.locationName = action.payload;
		},
	},
});

export const { setCenterCoordinates, setZoom, setLocationName } =
	mapSlice.actions;

export default mapSlice.reducer;
