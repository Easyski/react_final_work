import { FC } from "react";
import { Provider } from "react-redux";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import mapboxgl from "mapbox-gl";

import { Map, Login, Profile, Logout } from "./pages";
import store from "./store";

import { AuthRoute, Menu } from "./components";

import "./styles/main.scss";
import "animate.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY as string;

export const App: FC = () => {
	return (
		<Provider store={store}>
			<Router>
				<Menu />
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/about" element={<p>ABOUT THIS PROJECT</p>} />
					{/* <Route path="/profile" element={<AuthRoute route={<Profile />} />} /> */}
					<Route path="/profile" element={<Profile />} />
					<Route path="/map" element={<AuthRoute route={<Map />} />} />
					<Route path="/guide" element={<p>HOW TO USE</p>} />
					<Route path="/logout" element={<AuthRoute route={<Logout />} />} />

					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</Router>
			<ToastContainer
				pauseOnHover={false}
				autoClose={2000}
				pauseOnFocusLoss={false}
			/>
		</Provider>
	);
};
