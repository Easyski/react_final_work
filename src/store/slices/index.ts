export {
	setMode,
	setNewMarkers,
	default as editorReducer,
} from "./editorSlice";

export {
	setCenterCoordinates,
	setZoom,
	default as mapReducer,
} from "./mapSlice";

export { setLocations, default as sidebarReducer } from "./sidebarSlice";
