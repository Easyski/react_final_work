import { FC } from "react";
import cn from "classnames";

import { BiChevronRight } from "react-icons/bi";
import { ILink } from "./Link.styles";

const Link: FC<ILink> = ({ content, type, extraStyle, onClick }) => {
	const icon = () => {
		switch (type) {
			case "arrow":
				return <BiChevronRight className="link-icon" />;
		}
	};

	const handleOnClick = (e: any) => {
		e.preventDefault();
		onClick();
	};

	return (
		<div className={cn("flex flex-h align-center pointer", { extraStyle })}>
			<button className="btn-as-text pointer" onClick={handleOnClick}>
				{content}
			</button>
			{icon()}
		</div>
	);
};

export default Link;
