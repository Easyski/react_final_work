import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	User,
	EmailAuthProvider,
	reauthenticateWithCredential,
	deleteUser,
} from "firebase/auth";
import {
	addDoc,
	collection,
	getDocs,
	query,
	where,
	deleteDoc,
} from "firebase/firestore";
import db from "../utils/firebase.config";

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

let currentUser: User | null = null;

interface IUser {
	user: {
		uid: string;
		email: string;
		name: string;
		image?: string;
	} | null;
	signedIn: boolean;
	error?: IFBError;
}

type IFBError = {
	type: string;
	code: number;
};

const errorCodes = {
	no_error: { code: 0, type: "no_error" },
	mail: { code: 1, type: "mail" },
	password: { code: 2, type: "pass" },
	google: { code: 3, type: "google" },
	user: { code: 4, type: "user" },
};

/**
 * Sign in to the Easyski Firebase with email and password.
 * @param email The email adress the user wants to sign in with.
 * @param password The password passed by the user.
 * @returns A promise that contains the userdata, a "signedIn" boolean
 * and if an error occurs, the error is passed as well.
 */
const signIn = async (email: string, password: string): Promise<IUser> => {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);

		const user = {
			uid: userCredential.user.uid,
			email: userCredential.user.email as string,
			name: userCredential.user.displayName as string,
		};

		return { user, signedIn: true };
	} catch (error: any) {
		const { code, message } = error;

		const errorCode = () => {
			if (code === "auth/invalid-email") return errorCodes.mail;
			else if (code === "auth/user-not-found") return errorCodes.user;
			return errorCodes.password;
		};

		console.error(
			"An error occured while trying to log in. Please try again.",
			{ errorCode: errorCode(), code, message }
		);

		return { user: null, signedIn: false, error: errorCode() };
	}
};

/**
 * Sign up to the Easyski Firebase with email and password.
 * @param email The email adress the user wants to register with.
 * @param password The password passed by the user.
 * @returns *nothing*
 */
const signUp = async (
	name: string,
	email: string,
	password: string
): Promise<IUser> => {
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password);
		const newUser = res.user;
		await addDoc(collection(db, "users"), {
			uid: newUser.uid,
			name,
			authProvider: "local",
			email,
		});

		return {
			signedIn: true,
			user: { email, name, uid: newUser.uid },
		};
	} catch (error: any) {
		console.error(
			"An error occured while trying to register. Please try again.",
			error
		);

		return {
			signedIn: false,
			user: null,
			error: errorCodes.google,
		};
	}
};

/**
 * Allows users to sign in with Google.
 * https://blog.logrocket.com/user-authentication-firebase-react-apps/
 */
const signInWithGoogle = async (): Promise<IUser> => {
	try {
		const res = await signInWithPopup(auth, googleProvider);
		const user = res.user;

		const q = query(collection(db, "users"), where("uid", "==", user.uid));
		const docs = await getDocs(q);

		if (docs.docs.length === 0) {
			await addDoc(collection(db, "users"), {
				uid: user.uid,
				name: user.displayName,
				authProvider: "google",
				email: user.email,
				image: user.photoURL,
			});
		}

		if (user.photoURL)
			return {
				user: {
					uid: user.uid,
					email: user.email as string,
					image: user.photoURL,
					name: user.displayName as string,
				},
				signedIn: true,
			};
		return {
			user: {
				uid: user.uid,
				email: user.email as string,
				name: user.displayName as string,
			},
			signedIn: true,
		};
	} catch (error: any) {
		console.error(
			"An error occured while trying to log in. Please try again.",
			error
		);

		return {
			user: null,
			signedIn: false,
			error: errorCodes.google,
		};
	}
};

/**
 * Log the current user out.
 */
const logout = async (): Promise<boolean> => {
	try {
		await signOut(auth);
		return true;
	} catch (error) {
		console.error("An error occured while trying to log out!", error);
		return false;
	}
};

/**
 * Get all available user data.
 */
const getUser = (): IUser => {
	if (!currentUser) return { signedIn: false, user: null };
	return {
		signedIn: true,
		user: {
			email: currentUser.email as string,
			name: currentUser.displayName as string,
			uid: currentUser.uid,
			image: currentUser.photoURL ? currentUser.photoURL : undefined,
		},
	};
};
/**
 * Get all available user data.
 */
const deleteSignedUser = async (
	password: string
): Promise<{ error: boolean }> => {
	if (!auth.currentUser) return { error: true };
	try {
		const credential = EmailAuthProvider.credential(
			auth.currentUser.email as string,
			password
		);

		const result = await reauthenticateWithCredential(
			auth.currentUser,
			credential
		);

		// REMOVE USER FROM USERS IN FIREBASE
		const q = query(
			collection(db, "users"),
			where("uid", "==", auth.currentUser.uid)
		);
		// const pointSnapshot = await getDocs(pointsCol);
		// const userList = pointSnapshot.docs.map((doc) => doc.data());

		// console.log(userList);

		// await deleteDoc(docs.docs[0]);

		console.log("user", result.user);
		// Pass result.user here
		// await deleteUser(result.user);
		return { error: false };
	} catch (error: any) {
		return { error: true };
	}
};

export { signIn, signUp, signInWithGoogle, logout, getUser, deleteSignedUser };
