import { FC } from "react";

import { Navigation, Topbar, Sidebar } from "../components";

const Map: FC = () => {
	return (
		<>
			<Navigation />
			<Topbar />
			<Sidebar />
		</>
	);
};

export default Map;
