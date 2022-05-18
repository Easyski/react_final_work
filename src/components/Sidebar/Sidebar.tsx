import { FC } from "react";
import { GeoSearch, SearchResults } from "./index";
import { ISidebar } from "./Sidebar.types";
import "./Sidebar.css";

const Sidebar: FC<ISidebar> = () => {
	return (
		<div className="sidebarContainer">
			<GeoSearch />
			<SearchResults />
		</div>
	);
};

export default Sidebar;
