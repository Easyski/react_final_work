import { FC } from "react";

import { Logo, appStore, playStore } from "@/assets";

const Mobile: FC = () => {
	return (
		<div className="full-view-width-heigth flex flex-v align-center justify-evenly mobile">
			<img src={Logo} alt="Easyski logo" className="logo" />
			<p className="font-xxl bold text ">App coming soon!</p>
			<p className="font-lg text">
				You can already check out
				<span className="color-blue bold"> Easyski</span> on your desktop!
			</p>
			<img src={appStore} alt="Download on the App Store" className="store" />
			<img src={playStore} alt="Download on the Play Store" className="store" />
		</div>
	);
};

export default Mobile;
