import { FC, useEffect } from "react";

const About: FC = () => {
	useEffect(() => {
		if (window)
			window.location.replace("https://github.com/Easyski/react_final_work");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return null;
};

export default About;
