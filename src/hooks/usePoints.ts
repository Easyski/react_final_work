import { collection, getDocs } from "firebase/firestore";
import db from "@/utils/firebase.config";

const usePoints = async () => {
	const pointsCol = collection(db, "points");
	const pointSnapshot = await getDocs(pointsCol);
	const pointList = pointSnapshot.docs.map((doc) => doc.data());
	return pointList;
};

export { usePoints };
