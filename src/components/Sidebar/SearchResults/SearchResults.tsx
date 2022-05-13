import { FC, useEffect, useState } from "react";
import { ISearchResults } from "./SearchResults.types";
import "./SearchResults.css";
import { ILocation } from "../../types";

const SearchResults: FC<ISearchResults> = ({ locations, setCenter }) => {
	const [hasLocations, setHasLocations] = useState<boolean>(!!locations.length);

	useEffect(() => {
		setHasLocations(!!locations.length);
	}, [locations.length]);

	const setElements = () => {
		const elements = locations.map((element: ILocation, index: number) => {
			return (
				<p onClick={() => setCenter(element.center)} key={index}>
					<b>{element.name}</b>, {element.detailedName}
				</p>
			);
		});

		return elements;
	};

	return (
		<div>
			{hasLocations && (
				<div className="searchResultsContainer">{setElements()}</div>
			)}
		</div>
	);
};

export default SearchResults;
