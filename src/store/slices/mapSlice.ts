import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	centerCoordinates: [4.34878, 50.85045],
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
