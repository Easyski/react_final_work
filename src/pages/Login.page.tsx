import { FC, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import cn from "classnames";

import logo from "../assets/logo.svg";
import { signIn, signInWithGoogle, signUp } from "../hooks";
import {
	setLoggedIn,
	setUid,
	setEmail,
	setImage,
	setName,
} from "../store/slices";
import { Divider, FormInput, Link, Loading } from "../components";
import { toast } from "react-toastify";
import { auth } from "../utils/firebase.config";

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
	//#region
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
	// #endregion

	useEffect(() => {
		auth.onAuthStateChanged((value) => {
			if (value) {
				console.log("login", value);
				toast.success("You are signed in!");
				return;
			}
		});
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

		let formError: boolean = false;

		// Email or password are empty strings
		if (!emailState.value) {
			setEmailState({ value: "", error: true });
			toast.error("A valid email is required!", { autoClose: 5000 });
			formError = true;
		}
		if (!passwordState.value) {
			setPasswordState({ value: "", error: true });
			toast.error("A valid password is required!", { autoClose: 5000 });
			formError = true;
		}

		if (formError) {
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
			toast.error("This email doesn't seem to exist!", { autoClose: 5000 });
		} else if (error && error.code === 2) {
			setEmailState({ value: emailState.value, error: false });
			setPasswordState({ value: "", error: true });
			toast.error("This password is incorrect!", { autoClose: 5000 });
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
		let formError = false;

		// Check if any field is empty
		if (!nameState.value) {
			setNameState({ value: "", error: true });
			toast.error("A username is required!", { autoClose: 5000 });
			formError = true;
		}
		if (!emailState.value) {
			setEmailState({ value: "", error: true });
			toast.error("A valid email is required!", { autoClose: 5000 });
			formError = true;
		}
		if (!emailConfirmState.value) {
			setEmailConfirmState({ value: "", error: true });
			toast.error("Email adresses do not match!", { autoClose: 5000 });
			formError = true;
		}
		if (!passwordState.value) {
			setPasswordState({ value: "", error: true });
			toast.error("A valid password is required!", { autoClose: 5000 });
			formError = true;
		}
		if (!passwordConfirmState.value) {
			setPasswordConfirmState({ value: "", error: true });
			toast.error("Passwords do not match!", { autoClose: 5000 });
			formError = true;
		}
		if (emailState.value !== emailConfirmState.value) {
			setEmailConfirmState({ value: emailConfirmState.value, error: true });
			toast.error("Email adresses do not match!", { autoClose: 5000 });
			formError = true;
		}
		if (passwordState.value !== passwordConfirmState.value) {
			setPasswordConfirmState({ value: "", error: true });
			toast.error("Passwords do not match!", { autoClose: 5000 });
			formError = true;
		}

		if (formError) {
			setPasswordState({ value: "", error: true });
			setPasswordConfirmState({ value: "", error: true });
			return;
		}

		setIsLoading(true);

		// Register user
		const { signedIn, user, error } = await signUp(
			nameState.value,
			emailConfirmState.value,
			passwordConfirmState.value
		);

		dispatch(setLoggedIn(signedIn));

		if (error) {
			setPasswordState({ value: "", error: false });
			setPasswordConfirmState({ value: "", error: false });
			toast.error("An error occured! Please try again.", { autoClose: 5000 });
			setIsLoading(false);
			return;
		}

		if (user) {
			dispatch(setUid(user.uid));
			dispatch(setEmail(user.email));
			toast.success("Welcome, your account has been created!");
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

		dispatch(setLoggedIn(signedIn));
		if (user) {
			dispatch(setUid(user.uid));
			dispatch(setEmail(user.email));
			dispatch(setName(user.name));
			toast.success("Welcome, you are logged in!");
			user.image && dispatch(setImage(user.image));
		}
		setIsLoading(false);
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
							extraStyle="google border-box flex flex-h align-center"
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
