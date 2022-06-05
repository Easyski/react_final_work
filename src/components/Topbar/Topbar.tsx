import { FC } from "react";

import { GeoSearch, SearchResults, Mode } from "../";
import { ITopbar } from "./Topbar.types";
import { GoSearch } from "react-icons/go";

const Topbar: FC<ITopbar> = () => {
	return (
		<div className="full-width-height flex all-center">
			<div className="topbar flex">
				<GoSearch className="searchIcon font-xxl align-self-center" />
				<GeoSearch />
				<Mode />
			</div>
			<SearchResults />
		</div>
	);
};

export default Topbar;
