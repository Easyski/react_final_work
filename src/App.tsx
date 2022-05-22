// import mapboxgl from "mapbox-gl";
import { FC } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import mapboxgl from "mapbox-gl";

import Map from "./pages/map.page";
import store from "./store";

import "./styles/main.scss";
import { Menu } from "./components";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY as string;

export const App: FC = () => {
	return (
		<Provider store={store}>
			<Router>
				<Menu />
				<Routes>
					<Route path="/" element={<p>HOME</p>} />
					<Route path="/map" element={<Map />} />
				</Routes>
			</Router>
		</Provider>
	);
};
