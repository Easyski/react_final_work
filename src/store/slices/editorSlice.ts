import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	newMarkers: [],
};

export const editorSlice = createSlice({
	name: "editorSlice",
	initialState,
	reducers: {
		setNewMarkers: (state, action) => {
			state.newMarkers = action.payload;
		},
	},
});

export const { setNewMarkers } = editorSlice.actions;

export default editorSlice.reducer;
