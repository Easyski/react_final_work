import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setUserData, setLoggedIn } from "../../store/slices";
import { auth } from "../../utils/firebase.config";

const AuthRoute: FC<{ route: JSX.Element }> = ({ route }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const loggedIn = useSelector((store: any) => store.user.loggedIn);
	const userData = useSelector((store: any) => store.user.userData);

	const [authLoaded, setAuthLoaded] = useState<boolean>(false);

	auth.onAuthStateChanged((user) => {
		if (user) {
			!userData &&
				dispatch(
					setUserData({
						name: user.displayName,
						email: user.email as string,
						uid: user.uid,
						image: user.photoURL,
					})
				);
			!loggedIn && dispatch(setLoggedIn(true));
			return;
		}
		!authLoaded && setAuthLoaded(true);
	});

	useEffect(() => {
		if (!loggedIn && authLoaded) navigate("/", { replace: true });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loggedIn, authLoaded]);

	if (!loggedIn) return null;
	return route;
};

export default AuthRoute;
