import { createSlice } from "@reduxjs/toolkit";
import { ILocation } from "../../components/types";

interface IInitialState {
	locations: ILocation[] | [];
}

const initialState: IInitialState = {
	locations: [],
};

export const topbarSlice = createSlice({
	name: "topbarSlice",
	initialState,
	reducers: {
		setLocations: (state, action) => {
			state.locations = action.payload;
		},
	},
});

export const { setLocations } = topbarSlice.actions;

export default topbarSlice.reducer;
