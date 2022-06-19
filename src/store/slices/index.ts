export {
	// -----------
	// MARKERS
	// -----------
	setAddMarkerList,
	setClearMarkerList,
	setOverrideMarkerList,
	setSelectedMarkerIndex,
	// -----------
	// TRACKS
	// -----------
	setAddTrackList,
	setClearTrackList,
	setOverrideTrackList,
	setSelectedTrackIndex,
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
	default as sidebarReducer,
} from "./sidebarSlice";

export {
	setCenterCoordinates,
	setZoom,
	setLocationName,
	default as mapReducer,
} from "./mapSlice";

export { setLoggedIn, setUserData, default as userReducer } from "./userSlice";

export { setLocations, setMode, default as topbarReducer } from "./topbarSlice";
