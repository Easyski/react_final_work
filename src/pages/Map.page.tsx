import { FC, useEffect } from "react";

import { Navigation, Topbar, Sidebar } from "../components";
import { usePointsCollection } from "../hooks";

const Map: FC = () => {
	const points = usePointsCollection();

	useEffect(() => {
		points.then((points) => console.log(points));
	});

	return (
		<>
			<Navigation />
			<Topbar />
			<Sidebar />
			{/* <Bottombar /> */}
		</>
	);
};

export default Map;
