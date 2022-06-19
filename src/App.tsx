import { FC } from "react";
import { Provider } from "react-redux";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import mapboxgl from "mapbox-gl";
import { ToastContainer } from "react-toastify";
import { isMobile } from "react-device-detect";

import { AuthRoute, Menu } from "@/components";
import { Map, Login, Profile, Logout, Mobile } from "@/pages";
import store from "@/store";

import "@/styles/main.scss";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY as string;

export const App: FC = () => {
	if (isMobile) return <Mobile />;
	return (
		<Provider store={store}>
			<Router>
				<Menu />
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/about" element={<p>ABOUT THIS PROJECT</p>} />
					<Route path="/profile" element={<AuthRoute route={<Profile />} />} />
					<Route path="/map" element={<AuthRoute route={<Map />} />} />
					<Route path="/logout" element={<AuthRoute route={<Logout />} />} />

					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</Router>
			<ToastContainer
				pauseOnHover={false}
				autoClose={2000}
				pauseOnFocusLoss={false}
				className="toast-container"
			/>
		</Provider>
	);
};
