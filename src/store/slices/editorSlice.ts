import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
	mode: null | "points" | "tracks" | "routes";
	allowNewMarker: boolean;
	markerModal: boolean;
}

const initialState: IInitialState = {
	mode: null,
	allowNewMarker: false,
	markerModal: false,
};

export const editorSlice = createSlice({
	name: "editorSlice",
	initialState,
	reducers: {
		setMode: (state, action) => {
			state.mode = action.payload;
		},
		setAllowNewMarker: (state, action) => {
			state.allowNewMarker = action.payload;
		},
		setMarkerModal: (state, action) => {
			state.markerModal = action.payload;
		},
	},
});

export const { setMode, setAllowNewMarker, setMarkerModal } =
	editorSlice.actions;

export default editorSlice.reducer;
