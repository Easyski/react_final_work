import { FC, useEffect } from "react";

import { Navigation, Topbar, Sidebar } from "@/components";
import { usePoints } from "@/hooks";

const Map: FC = () => {
	const points = usePoints();

	useEffect(() => {
		points.then((points) => console.log(points));
	});

	return (
		<div className="map grid full-view-width-heigth">
			<Navigation />
			<Topbar />
			<Sidebar />
			{/* <Bottombar /> */}
		</div>
	);
};

export default Map;
