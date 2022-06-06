import { FC } from "react";
import { useDispatch } from "react-redux";

import { setZoom } from "@/store/slices";

const Bottombar: FC = () => {
	const dispatch = useDispatch();
	const handleButtonClick = () => {
		console.log("ZOOM OUT");
		dispatch(setZoom(7));
	};

	return (
		<div className="container bottombar">
			<button className="btn-as-text bold" onClick={handleButtonClick}>
				Zoom Out
			</button>
		</div>
	);
};

export default Bottombar;
