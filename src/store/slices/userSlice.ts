import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
	uid?: string;
	email?: string;
	loggedIn: boolean;
	name?: string;
	image?: string;
	user: any | null;
}

const initialState: IInitialState = {
	loggedIn: false,
	user: null,
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
		setImage: (state, action) => {
			state.image = action.payload;
		},
		setName: (state, action) => {
			state.name = action.payload;
		},
		setLoggedIn: (state, action) => {
			state.loggedIn = action.payload;
		},
		setUser: (state, action) => {
			state.user = action.payload;
		},
	},
});

export const { setEmail, setUid, setImage, setName, setLoggedIn, setUser } =
	userSlice.actions;

export default userSlice.reducer;
