// import mapboxgl from "mapbox-gl";
import mapboxgl from "mapbox-gl";
import { FC } from "react";
import { Provider } from "react-redux";
import { Navigation, Topbar } from "./components";
import Sidebar from "./components/Sidebar/Sidebar";
import store from "./store";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY as string;

export const App: FC = () => {
	return (
		<Provider store={store}>
			<Navigation />
			<Topbar />
			<Sidebar />
		</Provider>
	);
};
