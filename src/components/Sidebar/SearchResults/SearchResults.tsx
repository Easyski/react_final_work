import { FC } from "react";
import { useDispatch, useSelector, batch } from "react-redux";

import {
	setCenterCoordinates,
	setZoom,
	setLocations,
} from "../../../store/slices";
import { ISearchResults } from "./SearchResults.types";
import { Coordinates, ILocation } from "../../types";

import "./SearchResults.css";

const SearchResults: FC<ISearchResults> = () => {
	const dispatch = useDispatch();
	const locations = useSelector((state: any) => state.sidebar.locations);

	/**
	 * This function will fire whenever a search result is clicked. It will
	 * tell te store to set the new center and clear the results of the search.
	 * @param center The coordinates the map needs to move to.
	 */
	const handleResultClick = (center: Coordinates) => {
		batch(() => {
			dispatch(setCenterCoordinates(center));
			dispatch(setLocations([]));
			dispatch(setZoom(13));
		});
	};

	/**
	 * This function uses the fetched locationdata to make React HTMLElements. They
	 * are then added to the document.
	 * @returns JSX elements of the fetched location data.
	 */
	const setElements = () => {
		const elements = locations.map((element: ILocation, index: number) => {
			return (
				<p onClick={() => handleResultClick(element.center)} key={index}>
					<b>{element.name}</b>, {element.detailedName}
				</p>
			);
		});

		return elements;
	};

	return (
		<div>
			{!!locations.length && (
				<div className="searchResultsContainer">{setElements()}</div>
			)}
		</div>
	);
};

export default SearchResults;
