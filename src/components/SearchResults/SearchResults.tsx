import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	setCenterCoordinates,
	setZoom,
	setLocations,
	setLocationName,
} from "@/store/slices";
import { ICoordinates, ILocation } from "@/components/types";

const SearchResults: FC = () => {
	const dispatch = useDispatch();
	const locations = useSelector((state: any) => state.topbar.locations);

	/**
	 * This function will fire whenever a search result is clicked. It will
	 * tell te store to set the new center and clear the results of the search.
	 * @param center The coordinates the map needs to move to.
	 */
	const handleResultClick = (center: ICoordinates, name: string) => {
		dispatch(setCenterCoordinates(center));
		dispatch(setLocationName(name));
		dispatch(setLocations([]));
		dispatch(setZoom(13));
	};

	/**
	 * This function uses the fetched locationdata to make React HTMLElements. They
	 * are then added to the document.
	 * @returns JSX elements of the fetched location data.
	 */
	const setElements = () => {
		const elements = locations.map((element: ILocation, index: number) => {
			return (
				<p
					onClick={() =>
						handleResultClick(element.coordinates, element.detailedName)
					}
					key={index}
					className="result pointer"
				>
					<span className="bold">{element.name}</span>,
					{" " + element.detailedName}
				</p>
			);
		});

		return elements;
	};

	if (!!locations.length)
		return (
			<div className="search-results border-box absolute top">
				{setElements()}
			</div>
		);

	return null;
};

export default SearchResults;
