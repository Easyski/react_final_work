import { FC } from "react";
import { IStyledText } from "./styledText.types";
import "./StyledText.scss";

const StyledText: FC<IStyledText> = ({ content }) => {
	return <p className="styledText">{content}</p>;
};

export default StyledText;
