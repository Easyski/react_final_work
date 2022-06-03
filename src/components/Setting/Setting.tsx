import { FC, useState } from "react";

import { ISetting } from "./Setting.types";
import { ToggleSlider } from "react-toggle-slider";

const Setting: FC<ISetting> = ({ title, content, defaultValue }) => {
	const [value, setValue] = useState<boolean>(defaultValue);

	const handleSettingClick = () => {
		setValue(!value);
	};

	return (
		<div
			className="setting margin-auto border-box margin-bottom-lg"
			onClick={handleSettingClick}
		>
			<div className="flex flex-h align-center justify-between">
				<div className="content">
					<h3 className="title bold font-md">{title}</h3>
					<p className=" font-sm color-dark-grey">{content}</p>
				</div>
				<ToggleSlider
					onToggle={(toggle) => console.log("TOGGLE:", toggle)}
					barHeight={20}
					barWidth={40}
					handleSize={12}
					barStyles={{ marginLeft: 20 }}
					handleStyles={{ marginLeft: 20 }}
					draggable={true}
					active={value}
				/>
			</div>
		</div>
	);
};

export default Setting;
