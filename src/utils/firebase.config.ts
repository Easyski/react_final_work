import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
	apiKey: "AIzaSyAlYkLRKqay7nvXLcsRnhiEmdPiJ201mSQ",
	authDomain: "easyski-react.firebaseapp.com",
	projectId: "easyski-react",
	storageBucket: "easyski-react.appspot.com",
	messagingSenderId: "461495911488",
	appId: "1:461495911488:web:112e598296fa41e7c1cba5",
	measurementId: "G-F6TKH615TN",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db;
export { auth, analytics };
