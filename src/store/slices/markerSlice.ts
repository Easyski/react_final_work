import { IMarker } from "@/components/types";
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
	markerList: IMarker[];
	selectedMarkerIndex?: number;
}

const initialState: IInitialState = {
	markerList: [],
};

export const markerSlice = createSlice({
	name: "markerSlice",
	initialState,
	reducers: {
		// -----------
		// :: MARKERS
		// -----------
		setAddMarkerList: (state, action) => {
			state.markerList.push(action.payload);
		},
		setClearMarkerList: (state) => {
			state.markerList = [];
		},
		setOverrideMarkerList: (state, action) => {
			state.markerList = action.payload;
		},
		setSelectedMarkerIndex: (state, action) => {
			state.selectedMarkerIndex = action.payload;
		},
		setUpdateMarker: (state, action) => {
			// ACTION : [MARKER, INDEX]
			state.markerList[action.payload[1]] = action.payload[0];
		},
	},
});

export const {
	setAddMarkerList,
	setClearMarkerList,
	setOverrideMarkerList,
	setSelectedMarkerIndex,
	setUpdateMarker,
} = markerSlice.actions;

export default markerSlice.reducer;
