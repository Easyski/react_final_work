import { createSlice } from "@reduxjs/toolkit";
import { ICoordinates } from "../../components/types";

interface IInitialState {
	markerList: ICoordinates[];
	selectedMarkerIndex?: ICoordinates;
}

const initialState: IInitialState = {
	markerList: [],
};

export const sidebarSlice = createSlice({
	name: "sidebarSlice",
	initialState,
	reducers: {
		setMarkerList: (state, action) => {
			state.markerList = action.payload;
		},
		setSelectedMarkerIndex: (state, action) => {
			state.selectedMarkerIndex = action.payload;
		},
	},
});

export const { setMarkerList, setSelectedMarkerIndex } = sidebarSlice.actions;

export default sidebarSlice.reducer;
