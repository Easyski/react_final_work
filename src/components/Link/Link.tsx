import { FC } from "react";
import cn from "classnames";

import { BiChevronLeft, BiChevronRight, BiHelpCircle } from "react-icons/bi";
import { ILink } from "./Link.styles";

const Link: FC<ILink> = ({ content, type, extraStyle, textStyle, onClick }) => {
	const icon = () => {
		switch (type) {
			case "arrow":
				return <BiChevronRight className={cn("link-icon", textStyle)} />;
			case "help":
				return <BiHelpCircle className={cn("link-icon ", textStyle)} />;
			case "back":
				return <BiChevronLeft className={cn("link-icon", textStyle)} />;
		}
	};

	const handleOnClick = (e: any) => {
		e.preventDefault();
		onClick();
	};

	return (
		<>
			{type === "submit" ? (
				<button
					className="submit color-white bold uppercase"
					type="submit"
					onClick={handleOnClick}
				>
					{content}
				</button>
			) : (
				<div
					className={cn("flex flex-h align-center pointer contain", extraStyle)}
					onClick={handleOnClick}
				>
					{type === "back" ? (
						<>
							{icon()}
							<p className={cn(textStyle)}>{content}</p>
						</>
					) : (
						<>
							<p className={cn(textStyle)}>{content}</p>
							{icon()}
						</>
					)}
				</div>
			)}
		</>
	);
};

export default Link;
