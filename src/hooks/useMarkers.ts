import { ICoordinates } from "../components/types";

/**
 * Find the provided marker in the provided list. It compares both the
 * latitude and the longitude of the provided marker to the elements in
 * the list.
 * @param marker The marker that needs to be found.
 * @param markerList The list the marker needs to be found in.
 * @returns The index of the element. If the marker doesn't exist, null is
 * returned.
 */
const findMarkerIndex = (marker: ICoordinates, markerList: any[]) => {
	const markerIndex = markerList.findIndex((element: ICoordinates) => {
		return element.lat === marker.lat && element.lng === marker.lng;
	});

	if (markerIndex !== -1) return markerIndex;
	return null;
};

/**
 * Delete the provided marker in the provided list.
 * @param marker The marker that needs to be deleted.
 * @param markerList The list the marker needs to be deleted from.
 * @returns The new list of markers without the deleted element. If the
 * marker doesn't exist, null is returned.
 */
const removeMarkerFromList = (marker: ICoordinates, markerList: any[]) => {
	const index = findMarkerIndex(marker, markerList);

	if (index === null) return null;

	// Parameter cannot be modified directly and since the splice returns only
	// the deleted element, the complete array must be stored in a variable.
	let arrayToModify = [...markerList];
	arrayToModify.splice(index, 1);
	return arrayToModify;
};

/**
 * Search for the provided marker in the provided list.
 * @param marker The marker that needs to be found.
 * @param markerList The list the marker needs to be found in.
 * @returns The index of the marker in the list. If the marker doesn't exist,
 * null is returned.
 */
const findMarkerInList = (marker: ICoordinates, markerList: any[]) => {
	const index = findMarkerIndex(marker, markerList);
	if (index === null) return null;

	return index;
};

export { removeMarkerFromList, findMarkerInList };
