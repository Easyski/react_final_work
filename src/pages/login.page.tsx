import { FC, useRef, useState } from "react";
import { signIn } from "../hooks";

const Login: FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const mailInput = useRef<HTMLInputElement>(null);
	const passInput = useRef<HTMLInputElement>(null);

	const handleFormSubmit = (e: any) => {
		e.preventDefault();
		if (!mailInput.current || !passInput.current) return;
		setIsLoading(true);
		console.log("MAIL", mailInput.current.value);
		console.log("PASSWORD", passInput.current.value);
		signIn(mailInput.current.value, passInput.current.value);
	};

	return (
		<div className="flex all-center full-view-width-heigth background">
			{!isLoading && (
				<form
					className="login container flex flex-v "
					onSubmit={handleFormSubmit}
				>
					<h2 className="title self-align-center">Easyski</h2>
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
	);
};

export default Login;
