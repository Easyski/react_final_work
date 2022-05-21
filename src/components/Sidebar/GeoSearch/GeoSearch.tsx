import { FC, useEffect, useRef } from "react";

import { IGeoSearchTypes } from "./GeoSearch.types";
import { useDispatch } from "react-redux";

import "./GeoSearch.css";
import { setLocations } from "../../../store/slices";
import { Coordinates, ILocation } from "../../types";
import { useSelector } from "react-redux";

const GeoSearch: FC<IGeoSearchTypes> = () => {
	const dispatch = useDispatch();
	const locations = useSelector((state: any) => state.sidebar.locations);

	const inputRef = useRef<HTMLInputElement | null>(null);

	/**
	 * This function will trigger everytime the @param locations is empty.
	 * It will clear the input field.
	 */
	useEffect(() => {
		if (!locations.length && inputRef.current) inputRef.current.value = "";
	}, [locations]);

	/**
	 * This function will be excecuted whenever the value of the input field
	 * changes. It will use the Mapbox GL api to get the 5 most accurate
	 * matches.
	 *
	 * @param event This is used to access the value of the input field.
	 */
	const handleSearchInput = (event: any) => {
		if (!event.target.value) return handleFetchResults(null);

		fetch(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${event.target.value}}.json?access_token=${process.env.REACT_APP_MAPBOX_KEY}`
		)
			.then((req) => req.json())
			.then((results) => {
				handleFetchResults(results);
			})
			.catch((err) => {
				console.error("An error occured while trying to find location:", err);
				handleFetchResults(null);
			});
	};

	/**
	 * Here the results of the @function handleSearchInput will be handled.
	 * The useable data gets filtered and are pushed to the store.
	 *
	 * @param results This is an array of the 5 best matches returned from
	 * the Mapbog GL API.
	 */
	const handleFetchResults = (results: any) => {
		if (!results) return dispatch(setLocations([]));
		const filteredResults: ILocation[] = results.features.map(
			(element: any): ILocation => {
				return {
					name: element.text as string,
					detailedName: element.place_name as string,
					center: element.center as Coordinates,
				};
			}
		);
		dispatch(setLocations(filteredResults));
	};

	return (
		<div className="searchContainer">
			<input
				type="text"
				className="searchInput"
				placeholder="Find your destination"
				onChange={handleSearchInput}
				ref={inputRef}
			/>
		</div>
	);
};

export default GeoSearch;
