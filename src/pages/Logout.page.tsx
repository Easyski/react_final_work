import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { logout } from "@/hooks/useCredentials";
import { setLoggedIn } from "@/store/slices";

const Logout: FC = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		logout().then((loggedOut) => {
			if (loggedOut) {
				dispatch(setLoggedIn(!loggedOut));
				toast.success("You have been logged out!");
				return;
			}
		}); // eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="flex all-center full-view-width-heigth">
			<p className="container padding-md">Logging out ...</p>
		</div>
	);
};

export default Logout;
