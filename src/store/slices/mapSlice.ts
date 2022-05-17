import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	centerCoordinates: [4.34878, 50.85045],
};

export const mapSlice = createSlice({
	name: "mapSlice",
	initialState,
	reducers: {
		setCenterCoordinates: (state, action) => {
			state.centerCoordinates = action.payload;
		},
	},
});

export const { setCenterCoordinates } = mapSlice.actions;

export default mapSlice.reducer;
