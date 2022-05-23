import { FC } from "react";

import { GeoSearch, SearchResults, Mode } from "../";
import { ITopbar } from "./Topbar.types";
import { GoSearch } from "react-icons/go";

const Topbar: FC<ITopbar> = () => {
	return (
		<div className="topbar container flex">
			<GoSearch className="searchIcon font-xl self-align-center" />
			<GeoSearch />
			<Mode />
			<SearchResults />
		</div>
	);
};

export default Topbar;
