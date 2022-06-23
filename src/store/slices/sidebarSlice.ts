import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
	explanation: boolean;
}

const initialState: IInitialState = {
	explanation: true,
};

export const sidebarSlice = createSlice({
	name: "sidebarSlice",
	initialState,
	reducers: {
		setExplanation: (state, action) => {
			state.explanation = action.payload;
		},
	},
});

export const { setExplanation } = sidebarSlice.actions;

export default sidebarSlice.reducer;
