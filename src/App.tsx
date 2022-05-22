// import mapboxgl from "mapbox-gl";
import mapboxgl from "mapbox-gl";
import { FC } from "react";
import { Provider } from "react-redux";
import Map from "./pages/map.page";
import store from "./store";
import "./styles/main.scss";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY as string;

export const App: FC = () => {
	return (
		<Provider store={store}>
			{/* <Navigation />
			<Topbar />
			<Sidebar /> */}
			<Map />
		</Provider>
	);
};
