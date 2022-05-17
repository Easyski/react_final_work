import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCenterCoordinates } from "../../../store/slices/mapSlice";
import { ISearchResults } from "./SearchResults.types";
import "./SearchResults.css";
import { ILocation } from "../../types";

const SearchResults: FC<ISearchResults> = ({ locations }) => {
	const dispatch = useDispatch();
	const [hasLocations, setHasLocations] = useState<boolean>(!!locations.length);

	useEffect(() => {
		setHasLocations(!!locations.length);
	}, [locations.length]);

	const handleResultClick = (center: any) => {
		dispatch(setCenterCoordinates(center));
	};

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
			{hasLocations && (
				<div className="searchResultsContainer">{setElements()}</div>
			)}
		</div>
	);
};

export default SearchResults;
