import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
	uid?: string;
	email?: string;
	loggedIn: boolean;
}

const initialState: IInitialState = {
	loggedIn: false,
};

export const userSlice = createSlice({
	name: "userSlice",
	initialState,
	reducers: {
		setEmail: (state, action) => {
			state.email = action.payload;
		},
		setUid: (state, action) => {
			state.uid = action.payload;
		},
		setLoggedIn: (state, action) => {
			state.loggedIn = action.payload;
		},
	},
});

export const { setEmail, setUid, setLoggedIn } = userSlice.actions;

export default userSlice.reducer;
