import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../../store/slices";

const Logout: FC = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		console.log("LOGOUT");
		dispatch(setLoggedIn(false));
	});

	return (
		<div className="flex all-center full-view-width-heigth">
			<p className="container padding-md">Logging out ...</p>
		</div>
	);
};

export default Logout;
