import { createSlice } from "@reduxjs/toolkit";
import { ILocation } from "../../components/types";

interface IInitialState {
	locations: ILocation[] | [];
}

const initialState: IInitialState = {
	locations: [],
};

export const sidebarSlice = createSlice({
	name: "sidebarSlice",
	initialState,
	reducers: {
		setLocations: (state, action) => {
			state.locations = action.payload;
		},
	},
});

export const { setLocations } = sidebarSlice.actions;

export default sidebarSlice.reducer;
