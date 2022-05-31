import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { setEmail, setLoggedIn, setUid } from "../store/slices";

const Logout: FC = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setLoggedIn(false));
		dispatch(setUid(undefined));
		dispatch(setEmail(undefined));
		toast.info("You have been logged out!");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="flex all-center full-view-width-heigth">
			<p className="container padding-md">Logging out ...</p>
		</div>
	);
};

export default Logout;
