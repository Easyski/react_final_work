import { FC, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import cn from "classnames";

import logo from "../assets/logo.svg";
import { signIn, signInWithGoogle, signUp } from "../hooks";
import { setLoggedIn, setUid, setEmail } from "../store/slices";
import { Divider, FormInput, Link, Loading } from "../components";

const Login: FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isLoggedIn = useSelector((state: any) => state.user.loggedIn);

	// STATES FOR INPUT FIELDS
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [registerToggle, setRegisterToggle] = useState<boolean>(false);
	const [nameError, setNameError] = useState<boolean>(false);
	const [mailError, setMailError] = useState<boolean>(false);
	const [passError, setPassError] = useState<boolean>(false);
	const [inputData, setInputData] = useState<{
		email?: string;
		name?: string;
	}>({ email: undefined, name: undefined });

	// REF FOR FORM
	const formRef = useRef<HTMLFormElement>(null);
	// REFS FOR INPUT FIELDS
	const nameRef = useRef<HTMLInputElement>(null);
	const mailRef = useRef<HTMLInputElement>(null);
	const mailConfirmRef = useRef<HTMLInputElement>(null);
	const passRef = useRef<HTMLInputElement>(null);
	const passConfirmRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		isLoggedIn && navigate("/map", { replace: true });
	}, [isLoggedIn, navigate]);

	/**
	 * Takes the values of the mail and password input field and attempts to sign
	 * the user in. If this is succesful, the useEffect will be triggered. Else the
	 * user will need to try again.
	 * will be
	 * @param e - Formevent (only available on formsubmit)
	 */
	const handleLoginSubmit = async (e?: any) => {
		e && e.preventDefault();

		if (!mailRef.current || !passRef.current) return;

		setIsLoading(true);
		setInputData({
			email: mailRef.current.value,
		});

		const { signedIn, user, error } = await signIn(
			mailRef.current.value,
			passRef.current.value
		);

		batch(() => {
			dispatch(setLoggedIn(signedIn));

			if (signedIn && user) {
				dispatch(setUid(user.uid));
				dispatch(setEmail(user.email));
			}

			if (error && error.code === 1) {
				setMailError(true);
				setPassError(false);
				setInputData({ email: undefined });
			} else if (error && error.code === 2) {
				setMailError(false);
				setPassError(true);
			}

			setIsLoading(false);
		});
	};
	/**
	 * Allows for new users to be created. First it checks if the
	 * user has correctly filled in the input fields. If they are
	 * not correct, this will be visually displayed. If they are
	 * correct, the user will be created and logged in.
	 * @param e - Formevent (only available on formsubmit)
	 */
	const handleRegisterSubmit = async (e?: any) => {
		e && e.preventDefault();

		if (
			!mailRef.current ||
			!mailConfirmRef.current ||
			!passRef.current ||
			!passConfirmRef.current ||
			!nameRef.current
		)
			return;

		setIsLoading(true);

		if (!nameRef.current.value) {
			return batch(() => {
				setNameError(true);
				setIsLoading(false);
			});
		}

		if (
			!mailRef.current.value ||
			mailRef.current.value !== mailConfirmRef.current.value
		)
			return batch(() => {
				setNameError(false);
				setMailError(true);
				setPassError(false);
				setIsLoading(false);
			});

		if (passRef.current.value !== passConfirmRef.current.value)
			return batch(() => {
				setNameError(false);
				setMailError(false);
				setPassError(true);
				setInputData({ email: mailConfirmRef.current!.value });
				setIsLoading(false);
			});

		const { signedIn, user, error } = await signUp(
			nameRef.current.value,
			mailConfirmRef.current.value,
			passConfirmRef.current.value
		);

		if (error) {
			return batch(() => {
				dispatch(setLoggedIn(signedIn));
				setIsLoading(false);
			});
		}

		return batch(() => {
			dispatch(setLoggedIn(signedIn));

			if (user) {
				dispatch(setUid(user.uid));
				dispatch(setEmail(user.email));
			}
			setIsLoading(false);
		});
	};

	/**
	 * Sets the toggle for login or register form.
	 */
	const handleRegisterClick = () => {
		setInputData({
			email: undefined,
			name: undefined,
		});
		setRegisterToggle(!registerToggle);
	};

	/**
	 * When called, the user will be redirected to the How To Use
	 * page.
	 */
	const handleGuideClick = () => {
		navigate("/guide");
	};

	/**
	 * Allows the user to sign in with Google. Upon succesful
	 * login, the user is redirected to the app.
	 */
	const handleGoogleLogin = async () => {
		setIsLoading(true);
		const { signedIn, user } = await signInWithGoogle();

		batch(() => {
			dispatch(setLoggedIn(signedIn));
			if (user) {
				dispatch(setUid(user.uid));
				dispatch(setEmail(user.email));
			}
			setIsLoading(false);
		});
	};

	return (
		<div className="flex all-center full-view-width-heigth background">
			<div className="login container flex flex-v align-center">
				<img src={logo} alt="Easyski logo" className="logo" />

				{!isLoading && (
					<>
						<Link
							content={registerToggle ? "Back to login" : "Create an account"}
							type={registerToggle ? "back" : "arrow"}
							onClick={handleRegisterClick}
						/>
						<Divider text="or" extraStyle="margin-lg" />
						{registerToggle ? (
							<form
								className="login-form flex flex-v align-start"
								onSubmit={handleRegisterSubmit}
								ref={formRef}
								autoComplete="off"
							>
								<FormInput
									title="Username"
									type="text"
									ref={nameRef}
									extraStyle={cn({ invalid: nameError })}
									value={inputData.name}
								/>
								<FormInput
									title="Email"
									type="email"
									ref={mailRef}
									extraStyle={cn({ invalid: mailError })}
									value={inputData.email}
								/>
								<FormInput
									title="Confirm email"
									type="email"
									ref={mailConfirmRef}
									value={inputData.email}
								/>
								<FormInput
									title="Password"
									type="password"
									ref={passRef}
									extraStyle={cn({ invalid: passError })}
								/>
								<FormInput
									title="Repeat password"
									type="password"
									ref={passConfirmRef}
								/>
								<Link
									content="Login"
									type="submit"
									onClick={handleRegisterSubmit}
									extraStyle="margin-top-lg"
								/>
							</form>
						) : (
							<form
								className="login-form flex flex-v align-start"
								onSubmit={handleLoginSubmit}
								ref={formRef}
							>
								<FormInput
									title="Email or username"
									type="text"
									ref={mailRef}
									extraStyle={cn(
										{ invalid: mailError },
										{ valid: inputData.email }
									)}
									value={inputData.email}
								/>
								<FormInput
									title="Password"
									type="password"
									ref={passRef}
									extraStyle={cn({ invalid: passError })}
								/>
								<Link
									content="Login"
									type="submit"
									onClick={handleLoginSubmit}
									extraStyle="margin-top-lg"
								/>
							</form>
						)}
						<Divider text="or" extraStyle="margin-lg" />
						<button onClick={handleGoogleLogin}>Google</button>
						<Link
							content="Help"
							type="help"
							onClick={handleGuideClick}
							textStyle="color-grey margin-bottom-lg font-sm"
						/>
					</>
				)}
				{isLoading && <Loading />}
			</div>
		</div>
	);
};

export default Login;
