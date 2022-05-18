import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
	mode: "null" | "points" | "tracks" | "routes";
}

const initialState: IInitialState = {
	mode: "null",
};

export const editorSlice = createSlice({
	name: "editorSlice",
	initialState,
	reducers: {
		setMode: (state, action) => {
			state.mode = action.payload;
		},
	},
});

export const { setMode } = editorSlice.actions;

export default editorSlice.reducer;
