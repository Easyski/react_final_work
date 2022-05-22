import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { GiCancel } from "react-icons/gi";

import { setLocations } from "../../../store/slices";
import { Coordinates, ILocation } from "../../types";
import { IGeoSearchTypes } from "./GeoSearch.types";

const GeoSearch: FC<IGeoSearchTypes> = () => {
	const dispatch = useDispatch();
	const locationName = useSelector((state: any) => state.map.locationName);

	const [isEmpty, setIsEmpty] = useState<boolean>(true);
	const inputRef = useRef<HTMLInputElement | null>(null);

	/**
	 * This function will trigger everytime the  value of @param locationName
	 * is changed in the store. It will set the input field's placeholder to
	 * the current location.
	 */
	useEffect(() => {
		if (!inputRef.current || !locationName) return;
		inputRef.current.placeholder = locationName;
		inputRef.current.value = "";
		setIsEmpty(true);
	}, [locationName]);

	/**
	 * This function will be excecuted whenever the value of the input field
	 * changes. It will use the Mapbox GL api to get the 5 most accurate
	 * matches.
	 *
	 * @param event This is used to access the value of the input field.
	 */
	const handleSearchInput = (event: any) => {
		if (!event || !event.target.value) {
			batch(() => {
				!isEmpty && setIsEmpty(true);
				handleFetchResults(null);
			});
			return;
		}
		isEmpty && setIsEmpty(false);

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

	const handleClearButtonClick = () => {
		if (!inputRef.current) return;
		inputRef.current.value = "";
		handleSearchInput(null);
	};

	return (
		<div className="geoSearchContainer">
			<input
				type="text"
				className="searchInput"
				placeholder="Find your destination"
				onChange={handleSearchInput}
				ref={inputRef}
			/>
			{!isEmpty && (
				<GiCancel className="searchCancel" onClick={handleClearButtonClick} />
			)}
		</div>
	);
};

export default GeoSearch;
