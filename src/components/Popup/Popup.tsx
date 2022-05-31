import { FC, useState } from "react";
import { IPopup, IPopupType } from "./Popup.types";

import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { BiErrorAlt, BiInfoCircle } from "react-icons/bi";

const Popup: FC<IPopup> = ({ type, preload, content }) => {
	const [timer, setTimer] = useState<boolean>(true);

	const filterParams = () => {
		if (preload) {
			switch (preload) {
				case "databaseError":
					return handleContent(
						"error",
						"Oops, we are unable to make a connection to the database."
					);
				case "markerError":
					return handleContent("error", "Your marker could not be saved.");
				case "markerSucces":
					return handleContent("succes", "Your marker has been saved.");
			}
		}
		if (!type || !content) {
			console.error(
				"POPUP:",
				"Chose either a preset or pass both a type and content."
			);
			return null;
		}
		return handleContent(type, content);
	};

	const handleContent = (type: IPopupType, content: string) => {
		const icon = () => {
			switch (type) {
				case "succes":
					return <IoMdCheckmarkCircleOutline />;
				case "error":
					return <BiErrorAlt />;
				case "info":
					return <BiInfoCircle />;
			}
		};

		setTimeout(() => setTimer(false), 1000);

		return timer ? (
			<div className="popup container absolute bottom right flex flex-v">
				<div className="self-all-center">{icon()}</div>
			</div>
		) : null;
	};

	return filterParams();
};

export default Popup;
