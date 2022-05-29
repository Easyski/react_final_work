import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

interface IUser {
	user: { uid: string; email: string } | null;
	signedIn: boolean;
}

const signIn = (email: string, password: string): Promise<IUser> => {
	return signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in
			const user = {
				uid: userCredential.user.uid,
				email: userCredential.user.email as string,
			};
			console.log(user);

			return { user, signedIn: true };
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;

			console.error(
				"An error occured while trying to log in. Please try again.",
				{ code: errorCode, message: errorMessage }
			);
			return { user: null, signedIn: false };
		});
};

const signUp = () => {};

export { signIn, signUp };
