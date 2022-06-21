import { IMarker, ITrack, IRoute } from "@/components/types";

const findInList = (
	element: IMarker | ITrack | IRoute,
	list: IMarker[] | ITrack[] | IRoute[],
	type: "marker" | "track" | "route"
) => {
	let index: number | null;
	switch (type) {
		case "marker": {
			index = findMarkerIndex(element as IMarker, list as IMarker[]);
			break;
		}
		case "track": {
			index = findTrackIndex(element as ITrack, list as ITrack[]);
			break;
		}
		case "route": {
			index = findRouteIndex(element as IRoute, list as IRoute[]);
			break;
		}
	}
	return index;
};

/**
 * Delete the provided element in the provided list.
 *
 * @param element This can be either a markker, track or route.
 * @param list The list the element needs to be deleted from. This needs to
 * be an array of the same type as the element.
 *
 * @returns The new list without the deleted element. If the element doesn't
 * exist, null is returned.
 */
const removeFromList = (
	element: IMarker | ITrack | IRoute,
	list: IMarker[] | ITrack[] | IRoute[],
	type: "marker" | "track" | "route"
) => {
	let index = findInList(element, list, type);

	if (index === null) return null;

	// Parameter cannot be modified directly and since the splice returns only
	// the deleted element, the complete array must be stored in a variable.
	let arrayToModify = [...list];
	arrayToModify.splice(index, 1);
	return arrayToModify;
};

// -------------------------------------------------------------------
// :: FIND MARKER INDEX
// -------------------------------------------------------------------

const findMarkerIndex = (
	marker: IMarker,
	markerList: IMarker[]
): number | null => {
	const markerIndex = markerList.findIndex((element: IMarker) => {
		return (
			element.coordinates.lat === marker.coordinates.lat &&
			element.coordinates.lng === marker.coordinates.lng
		);
	});

	if (markerIndex !== -1) return markerIndex;
	return null;
};

// -------------------------------------------------------------------
// :: FIND TRACK INDEX
// -------------------------------------------------------------------

const findTrackIndex = (track: ITrack, trackList: ITrack[]): number | null => {
	const trackIndex = trackList.findIndex((element: ITrack) => {
		return element.coordinates[0] === track.coordinates[0];
	});

	if (trackIndex !== -1) return trackIndex;
	return 0;
};

// -------------------------------------------------------------------
// :: FIND ROUTE INDEX
// -------------------------------------------------------------------

const findRouteIndex = (route: IRoute, routeList: IRoute[]): number | null => {
	return 0;
};

// -------------------------------------------------------------------
// :: FIND ROUTE INDEX
// -------------------------------------------------------------------

const findMarkersByTrack = (track: ITrack, markerList: IMarker[]) => {
	let marker1!: IMarker;
	let marker2!: IMarker;
	for (let marker of markerList) {
		if (marker.coordinates.lng === track.coordinates[0][0]) marker1 = marker;
		if (marker.coordinates.lng === track.coordinates[1][0]) marker2 = marker;
		if (marker1 && marker2) break;
	}

	return [marker1, marker2];
};

export {
	removeFromList,
	findInList,
	findMarkerIndex,
	findTrackIndex,
	findRouteIndex,
	findMarkersByTrack,
};
