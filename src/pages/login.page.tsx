import { FC, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsGoogle } from "react-icons/bs";
import cn from "classnames";

import logo from "../assets/logo.svg";
import { signIn, signInWithGoogle, signUp } from "../hooks";
import { setLoggedIn, setUid, setEmail } from "../store/slices";
import { Divider, FormInput, Link, Loading } from "../components";

interface IState {
	value: string;
	error: boolean;
}

const Login: FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isLoggedIn = useSelector((state: any) => state.user.loggedIn);

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [registerToggle, setRegisterToggle] = useState<boolean>(false);

	// REF FOR FORM
	const formRef = useRef<HTMLFormElement>(null);
	// STATE FOR INPUT FIELDS
	const [nameState, setNameState] = useState<IState>({
		value: "",
		error: false,
	});
	const [emailState, setEmailState] = useState<IState>({
		value: "",
		error: false,
	});
	const [emailConfirmState, setEmailConfirmState] = useState<IState>({
		value: "",
		error: false,
	});
	const [passwordState, setPasswordState] = useState<IState>({
		value: "",
		error: false,
	});
	const [passwordConfirmState, setPasswordConfirmState] = useState<IState>({
		value: "",
		error: false,
	});

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

		// Email or password are empty strings
		if (!emailState.value) {
			setEmailState({ value: "", error: true });
			return;
		} else if (!passwordState.value) {
			setEmailState({ value: emailState.value, error: false });
			setPasswordState({ value: "", error: true });
			return;
		}

		setIsLoading(true);

		// Attempt to log user in
		const { signedIn, user, error } = await signIn(
			emailState.value,
			passwordState.value
		);

		dispatch(setLoggedIn(signedIn));

		if (signedIn && user) {
			dispatch(setUid(user.uid));
			dispatch(setEmail(user.email));
		}

		if (error && error.code === 1) {
			setEmailState({ value: emailState.value, error: true });
			setPasswordState({ value: "", error: false });
		} else if (error && error.code === 2) {
			setEmailState({ value: emailState.value, error: false });
			setPasswordState({ value: "", error: true });
		}

		setIsLoading(false);
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

		// Check if any field is empty
		if (!nameState.value) {
			setNameState({ value: "", error: true });
			return;
		} else if (!emailState.value) {
			setNameState({ value: nameState.value, error: false });
			setEmailState({ value: "", error: true });
			return;
		} else if (!emailConfirmState.value) {
			setNameState({ value: nameState.value, error: false });
			setEmailState({ value: emailState.value, error: false });
			setEmailConfirmState({ value: "", error: true });
			return;
		} else if (!passwordState.value) {
			setNameState({ value: nameState.value, error: false });
			setEmailState({ value: emailState.value, error: false });
			setEmailConfirmState({ value: emailConfirmState.value, error: false });
			setPasswordState({ value: "", error: true });
			return;
		} else if (!passwordConfirmState.value) {
			setNameState({ value: nameState.value, error: false });
			setEmailState({ value: emailState.value, error: false });
			setEmailConfirmState({ value: emailConfirmState.value, error: false });
			setPasswordState({ value: "", error: false });
			setPasswordConfirmState({ value: "", error: true });
			return;
		}

		setIsLoading(true);

		if (emailState.value !== emailConfirmState.value) {
			setEmailConfirmState({ value: emailConfirmState.value, error: true });
			setPasswordState({ value: "", error: false });
			setPasswordConfirmState({ value: "", error: false });
			setIsLoading(false);
			return;
		}

		if (passwordState.value !== passwordConfirmState.value) {
			setPasswordState({ value: "", error: false });
			setPasswordConfirmState({ value: "", error: true });
			setIsLoading(false);
			return;
		}

		// Register user
		const { signedIn, user, error } = await signUp(
			nameState.value,
			emailConfirmState.value,
			passwordConfirmState.value
		);

		dispatch(setLoggedIn(signedIn));

		if (error) {
			// TODO: alert user of a Firebase error
			setPasswordState({ value: "", error: false });
			setPasswordConfirmState({ value: "", error: false });
			setIsLoading(false);
			return;
		}

		if (user) {
			dispatch(setUid(user.uid));
			dispatch(setEmail(user.email));
			setIsLoading(false);
		}
	};

	/**
	 * Sets the toggle for login or register form. Clear the password
	 * values.
	 */
	const handleRegisterClick = () => {
		setPasswordState({ value: "", error: false });
		setPasswordConfirmState({ value: "", error: false });
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
									extraStyle={cn({ invalid: nameState.error })}
									value={nameState.value}
									onChange={(value) => setNameState({ value, error: false })}
								/>
								<FormInput
									title="Email"
									type="email"
									extraStyle={cn({ invalid: emailState.error })}
									value={emailState.value}
									onChange={(value) => setEmailState({ value, error: false })}
								/>
								<FormInput
									title="Confirm email"
									type="email"
									extraStyle={cn({ invalid: emailConfirmState.error })}
									value={emailConfirmState.value}
									onChange={(value) =>
										setEmailConfirmState({ value, error: false })
									}
								/>
								<FormInput
									title="Password"
									type="password"
									extraStyle={cn({ invalid: passwordState.error })}
									onChange={(value) =>
										setPasswordState({ value, error: false })
									}
								/>
								<FormInput
									title="Repeat password"
									type="password"
									extraStyle={cn({ invalid: passwordConfirmState.error })}
									onChange={(value) =>
										setPasswordConfirmState({ value, error: false })
									}
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
									extraStyle={cn({ invalid: emailState.error })}
									value={emailState.value}
									onChange={(value) => setEmailState({ value, error: false })}
								/>
								<FormInput
									title="Password"
									type="password"
									extraStyle={cn({ invalid: passwordState.error })}
									onChange={(value) =>
										setPasswordState({ value, error: false })
									}
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
						<Link
							content="Google"
							type="google"
							onClick={handleGoogleLogin}
							extraStyle="google flex flex-h align-center"
						/>
						<Divider text="or" extraStyle="margin-lg" />
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
