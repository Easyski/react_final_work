import { createSlice } from "@reduxjs/toolkit";
import { IRoute, ITrack, IMarker } from "@/components/types";

interface IInitialState {
	markerList: IMarker[];
	selectedMarkerIndex?: number;
	trackList: ITrack[];
	selectedTrackIndex?: number;
	routeList: IRoute[];
	selectedRouteIndex?: number;
	explanation: boolean;
}

const initialState: IInitialState = {
	markerList: [],
	trackList: [],
	routeList: [],
	explanation: true,
};

export const sidebarSlice = createSlice({
	name: "sidebarSlice",
	initialState,
	reducers: {
		// -----------
		// :: MARKERS
		// -----------
		setAddMarkerList: (state, action) => {
			state.markerList.push(action.payload);
		},
		setClearMarkerList: (state) => {
			state.markerList = [];
		},
		setOverrideMarkerList: (state, action) => {
			state.markerList = action.payload;
		},
		setSelectedMarkerIndex: (state, action) => {
			state.selectedMarkerIndex = action.payload;
		},
		setUpdateMarker: (state, action) => {
			// ACTION : [MARKER, INDEX]
			state.markerList[action.payload[1]] = action.payload[0];
		},
		// -----------
		// :: TRACKS
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
			// ACTION : [track, INDEX]
			state.trackList[action.payload[1]] = action.payload[0];
		},
		// -----------
		// :: ROUTES
		// -----------
		setAddRouteList: (state, action) => {
			state.routeList.push(action.payload);
		},
		setClearRouteList: (state) => {
			state.routeList = [];
		},
		setOverrideRouteList: (state, action) => {
			state.routeList = action.payload;
		},
		setSelectedRouteIndex: (state, action) => {
			state.selectedRouteIndex = action.payload;
		},
		// -----------
		// :: VARIA
		// -----------
		setExplanation: (state, action) => {
			state.explanation = action.payload;
		},
	},
});

export const {
	// -----------
	// MARKERS
	// -----------
	setAddMarkerList,
	setClearMarkerList,
	setOverrideMarkerList,
	setSelectedMarkerIndex,
	setUpdateMarker,
	// -----------
	// TRACKS
	// -----------
	setAddTrackList,
	setClearTrackList,
	setOverrideTrackList,
	setSelectedTrackIndex,
	setUpdateTrack,
	// -----------
	// ROUTES
	// -----------
	setAddRouteList,
	setClearRouteList,
	setOverrideRouteList,
	setSelectedRouteIndex,
	// -----------
	// VARIA
	// -----------

	setExplanation,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
