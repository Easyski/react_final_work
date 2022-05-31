import { FC, useEffect } from "react";
import { useDispatch, batch } from "react-redux";
import { setEmail, setLoggedIn, setUid } from "../store/slices";

const Logout: FC = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		batch(() => {
			dispatch(setLoggedIn(false));
			dispatch(setUid(undefined));
			dispatch(setEmail(undefined));
		});
	});

	return (
		<div className="flex all-center full-view-width-heigth">
			<p className="container padding-md">Logging out ...</p>
		</div>
	);
};

export default Logout;
