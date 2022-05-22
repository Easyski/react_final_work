import { createSlice } from "@reduxjs/toolkit";
import { Coordinates } from "../../components/types";

interface IInitialState {
	mode: null | "points" | "tracks" | "routes";
	newMarkers: IMarker[] | [];
}

interface IMarker {
	center: Coordinates;
	name?: string;
}

const initialState: IInitialState = {
	mode: null,
	newMarkers: [],
};

export const editorSlice = createSlice({
	name: "editorSlice",
	initialState,
	reducers: {
		setMode: (state, action) => {
			state.mode = action.payload;
		},
		setNewMarkers: (state, action) => {
			state.newMarkers = action.payload;
		},
	},
});

export const { setMode, setNewMarkers } = editorSlice.actions;

export default editorSlice.reducer;
