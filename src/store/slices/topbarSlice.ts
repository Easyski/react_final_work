import { createSlice } from "@reduxjs/toolkit";
import { ILocation } from "../../components/types";

interface IInitialState {
	locations: ILocation[] | [];
	mode: null | "points" | "tracks" | "routes";
}

const initialState: IInitialState = {
	locations: [],
	mode: null,
};

export const topbarSlice = createSlice({
	name: "topbarSlice",
	initialState,
	reducers: {
		setLocations: (state, action) => {
			state.locations = action.payload;
		},
		setMode: (state, action) => {
			state.mode = action.payload;
		},
	},
});

export const { setLocations, setMode } = topbarSlice.actions;

export default topbarSlice.reducer;
