import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
	loggedIn: boolean;
	userData: any | null;
}

const initialState: IInitialState = {
	loggedIn: false,
	userData: null,
};

export const userSlice = createSlice({
	name: "userSlice",
	initialState,
	reducers: {
		setLoggedIn: (state, action) => {
			state.loggedIn = action.payload;
		},
		setUserData: (state, action) => {
			state.userData = action.payload;
		},
	},
});

export const { setLoggedIn, setUserData } = userSlice.actions;

export default userSlice.reducer;
