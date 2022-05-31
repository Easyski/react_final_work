import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthRoute: FC<{ route: JSX.Element }> = ({ route }) => {
	const navigate = useNavigate();
	const loggedIn = useSelector((store: any) => store.user.loggedIn);

	useEffect(() => {
		if (!loggedIn) navigate("/", { replace: true });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loggedIn]);

	if (!loggedIn) return null;
	return route;
};

export default AuthRoute;
