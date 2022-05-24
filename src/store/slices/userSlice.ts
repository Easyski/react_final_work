import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
	user: any;
}

const initialState: IInitialState = {
	user: undefined,
};

export const userSlice = createSlice({
	name: "userSlice",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
	},
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
