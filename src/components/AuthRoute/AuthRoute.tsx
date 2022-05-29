import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRoute: FC<{ route: JSX.Element }> = ({ route }) => {
	// const [user, setUser] = useState<boolean>(false);
	const loggedIn = useSelector((store: any) => store.user.loggedIn);

	useEffect(() => {}, [loggedIn]);

	if (!loggedIn) return <Navigate to={"/"} />;
	return route;
};

export default AuthRoute;
