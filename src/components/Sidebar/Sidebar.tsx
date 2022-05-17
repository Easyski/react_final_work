import { FC, useState } from "react";
import { ICoordinates, ILocation } from "../types";
import { GeoSearch, SearchResults } from "./index";
import { ISidebar } from "./Sidebar.types";
import "./Sidebar.css";

const Sidebar: FC<ISidebar> = ({ setMapCenter }) => {
	const [locations, setLocations] = useState<ILocation[]>([]);

	const handleFetchResults = (results: any) => {
		if (!results.features) return setLocations([]);
		const filteredResults = results.features.map((element: any) => {
			return {
				name: element.text as String,
				detailedName: element.place_name as String,
				center: element.center as ICoordinates,
			};
		});
		setLocations(filteredResults);
	};

	return (
		<div className="sidebarContainer">
			<GeoSearch
				handleFetchResults={(results: any) => handleFetchResults(results)}
			/>
			<SearchResults
				locations={locations}
				setCenter={(center: ICoordinates) => setMapCenter(center)}
			/>
		</div>
	);
};

export default Sidebar;
