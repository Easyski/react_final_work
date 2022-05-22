import { FC } from "react";

import { IStyledText } from "./styledText.types";

const StyledText: FC<IStyledText> = ({ content, bold, italic, type }) => {
	const renderText = () => {
		const classNames = "";
		switch (type) {
			case "h1":
				return <h1 className={classNames}>{content}</h1>;
			case "h2":
				return <h2 className={classNames}>{content}</h2>;
			case "h3":
				return <h3 className={classNames}>{content}</h3>;
			case "p":
				return <p className={classNames}>{content}</p>;
			default:
				return <p className={classNames}>{content}</p>;
		}
	};

	return renderText();
};

export default StyledText;
