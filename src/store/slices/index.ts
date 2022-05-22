export {
	setMode,
	setNewMarkers,
	default as editorReducer,
} from "./editorSlice";

export {
	setCenterCoordinates,
	setZoom,
	setLocationName,
	default as mapReducer,
} from "./mapSlice";

export { setLocations, default as topbarReducer } from "./topbarSlice";
