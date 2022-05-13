import { FC, useState } from "react";
import { ILocation } from "../types";
import { GeoSearch, SearchResults } from "./index";
import { ISidebar } from "./Sidebar.types";
import "./Sidebar.css";
import { LngLatLike } from "mapbox-gl";

const Sidebar: FC<ISidebar> = ({ setMapCenter }) => {
	const [locations, setLocations] = useState<ILocation[]>();

	const handleFetchResults = (results: any) => {
		if (!results.features.length) return;
		const filteredResults = results.features.map((element: any) => {
			return {
				name: element.text as String,
				detailedName: element.place_name as String,
				center: element.center as LngLatLike,
			};
		});

		setLocations(filteredResults);
	};

	const handleSetCenter = (center: LngLatLike) => {
		setMapCenter(center);
	};

	return (
		<div className="sidebarContainer">
			<GeoSearch
				handleFetchResults={(results: any) => handleFetchResults(results)}
			/>
			{locations && (
				<SearchResults
					locations={locations}
					setCenter={(center: LngLatLike) => handleSetCenter(center)}
				/>
			)}
		</div>
	);
};

export default Sidebar;
