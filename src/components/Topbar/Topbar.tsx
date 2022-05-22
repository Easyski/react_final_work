import { FC } from "react";

import { GeoSearch, SearchResults } from "./index";
import EditorConfig from "./EditorConfig/EditorConfig";
import { ITopbar } from "./Topbar.types";
import { GoSearch } from "react-icons/go";

const Topbar: FC<ITopbar> = () => {
	return (
		<>
			<div className="topbarContainer">
				<GoSearch className="searchIcon" />
				<GeoSearch />
				<EditorConfig />
				<SearchResults />
			</div>
		</>
	);
};

export default Topbar;
