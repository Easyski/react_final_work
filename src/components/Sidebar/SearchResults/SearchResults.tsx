import { FC } from "react";
import { ISearchResults } from "./SearchResults.types";
import "./SearchResults.css";
import { ILocation } from "../../types";

const SearchResults: FC<ISearchResults> = ({ locations, setCenter }) => {
	const setElements = () => {
		const elements = locations.map((element: ILocation) => {
			return (
				<p onClick={() => setCenter(element.center)}>
					<b>{element.name}</b>, {element.detailedName}
				</p>
			);
		});

		return elements;
	};

	return <div className="searchResultsContainer">{setElements()}</div>;
};

export default SearchResults;
