// import mapboxgl from "mapbox-gl";
import { FC } from "react";
import { Provider } from "react-redux";
import { Navigation, Sidebar } from "./components";
import store from "./store";

export const App: FC = () => {
	return (
		<Provider store={store}>
			<Navigation fullScreen />
			<Sidebar />
		</Provider>
	);
};
