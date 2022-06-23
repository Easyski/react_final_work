import { ITrack } from "@/components/types";
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
	trackList: ITrack[];
	selectedTrackIndex?: number;
}

const initialState: IInitialState = {
	trackList: [],
};

export const trackSlice = createSlice({
	name: "trackSlice",
	initialState,
	reducers: {
		// -----------
		// :: TrackS
		// -----------
		setAddTrackList: (state, action) => {
			state.trackList.push(action.payload);
		},
		setClearTrackList: (state) => {
			state.trackList = [];
		},
		setOverrideTrackList: (state, action) => {
			state.trackList = action.payload;
		},
		setSelectedTrackIndex: (state, action) => {
			state.selectedTrackIndex = action.payload;
		},
		setUpdateTrack: (state, action) => {
			// ACTION : [Track, INDEX]
			state.trackList[action.payload[1]] = action.payload[0];
		},
	},
});

export const {
	setAddTrackList,
	setClearTrackList,
	setOverrideTrackList,
	setSelectedTrackIndex,
	setUpdateTrack,
} = trackSlice.actions;

export default trackSlice.reducer;
