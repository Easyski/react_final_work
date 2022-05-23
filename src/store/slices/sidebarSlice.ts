import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	newMarkers: [],
};

export const sidebarSlice = createSlice({
	name: "sidebarSlice",
	initialState,
	reducers: {
		setNewMarkers: (state, action) => {
			state.newMarkers = action.payload;
		},
	},
});

export const { setNewMarkers } = sidebarSlice.actions;

export default sidebarSlice.reducer;
