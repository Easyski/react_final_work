import { FC } from "react";
import { Provider } from "react-redux";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import mapboxgl from "mapbox-gl";

import { Map, Login } from "./pages";
import store from "./store";

import { Menu } from "./components";

import "./styles/main.scss";
import "animate.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY as string;

export const App: FC = () => {
	return (
		<Provider store={store}>
			<Router>
				<Menu />
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/profile" element={<p>PROFILE</p>} />
					<Route path="/map" element={<Map />} />
					<Route path="/about" element={<p>ABOUT THIS PROJECT</p>} />
					<Route path="/guide" element={<p>HOW TO USE</p>} />
					<Route path="/logout" element={<p>LOGOUT</p>} />

					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</Router>
		</Provider>
	);
};
