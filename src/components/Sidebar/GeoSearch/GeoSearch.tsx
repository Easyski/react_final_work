import { FC } from "react";

import { IGeoSearchTypes } from "./GeoSearch.types";
import "./GeoSearch.css";

const GeoSearch: FC<IGeoSearchTypes> = ({ handleFetchResults }) => {
	const handleSearchInput = (event: any) => {
		if (!event.target.value) return handleFetchResults([]);

		fetch(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${event.target.value}}.json?access_token=${process.env.REACT_APP_MAPBOX_KEY}`
		)
			.then((req) => req.json())
			.then((results) => {
				handleFetchResults(results);
			})
			.catch((err) => {
				console.error("An error occured while trying to find location:", err);
				handleFetchResults([]);
			});
	};

	return (
		<div className="searchContainer">
			<input
				type="text"
				className="searchInput"
				placeholder="Find your destination"
				onChange={handleSearchInput}
			/>
		</div>
	);
};

export default GeoSearch;