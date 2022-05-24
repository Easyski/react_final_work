import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

const signIn = (email: string, password: string) => {
	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in
			const user = userCredential.user;
			console.log("USER", user);
			// ...
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.error(errorCode, errorMessage);
		});
};

const signUp = () => {};

export { signIn, signUp };
