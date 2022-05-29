import { FC, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { signIn } from "../hooks";
import { setLoggedIn, setUid, setEmail } from "../store/slices";
import logo from "../assets/logo.svg";
import { Link } from "../components";

const Login: FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isLoggedIn = useSelector((state: any) => state.user.loggedIn);

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const mailInput = useRef<HTMLInputElement>(null);
	const passInput = useRef<HTMLInputElement>(null);

	const handleFormSubmit = (e: any) => {
		e.preventDefault();
		if (!mailInput.current || !passInput.current) return;
		setIsLoading(true);
		signIn(mailInput.current.value, passInput.current.value).then((value) => {
			batch(() => {
				dispatch(setLoggedIn(value.signedIn));
				if (value.signedIn && value.user) {
					dispatch(setUid(value.user.uid));
					dispatch(setEmail(value.user.email));
				}
				setIsLoading(false);
			});
		});
	};

	useEffect(() => {
		isLoggedIn && navigate("/map", { replace: true });
	}, [isLoggedIn, navigate]);

	const handleSubscribeClick = () => {
		console.log("click");
	};

	return (
		<div className="flex all-center full-view-width-heigth background">
			<div className="container flex flex-v align-center">
				<img src={logo} alt="Easyski logo" className="logo" />

				{!isLoading && (
					<form className="login" onSubmit={handleFormSubmit}>
						<Link
							content="Create an account"
							type="arrow"
							onClick={handleSubscribeClick}
						/>
						<input
							className="input login-input self-all-center "
							type="email"
							placeholder="email"
							ref={mailInput}
						/>
						<input
							className="input login-input self-all-center "
							type="password"
							placeholder="password"
							ref={passInput}
						/>
						<button
							className="btn-as-text login-button self-align-center bolder"
							type="submit"
						>
							Login
						</button>
					</form>
				)}
				{isLoading && <p className="bold">Loading ...</p>}
			</div>
		</div>
	);
};

export default Login;
