import { FC } from "react";
import cn from "classnames";

import { IDivider } from "./Divider.types";

const Divider: FC<IDivider> = ({ text, extraStyle }) => {
	return (
		<div className={cn("divider", extraStyle)}>
			<p className="divider-text font-sm light">{text}</p>
		</div>
	);
};

export default Divider;
