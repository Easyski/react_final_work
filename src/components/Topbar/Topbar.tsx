import { FC } from "react";
import { GoSearch } from "react-icons/go";

import { GeoSearch, SearchResults, Mode } from "@/components";

const Topbar: FC = () => {
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
