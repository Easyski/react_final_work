import { FC, useEffect } from "react";
import { useSelector } from "react-redux";

import ModeConfig from "./ModeConfig/ModeConfig";

import { BiLocationPlus } from "react-icons/bi";
import { FaRoute } from "react-icons/fa";
import { RiGuideLine } from "react-icons/ri";

import "./EditorConfig.css";
import MarkersConfig from "./MarkersConfig/MarkersConfig";

const EditorConfig: FC = () => {
	const editorMode = useSelector((state: any) => state.editor.mode);

	useEffect(() => {
		console.log("EditorConfig: editorMode", editorMode);
	}, [editorMode]);

	return (
		<>
			<div className="editorContainer">
				<ModeConfig mode="points" selectedMode={editorMode}>
					<BiLocationPlus />
				</ModeConfig>
				<ModeConfig mode="tracks" selectedMode={editorMode}>
					<RiGuideLine />
				</ModeConfig>
				<ModeConfig mode="routes" selectedMode={editorMode}>
					<FaRoute />
				</ModeConfig>
			</div>
			<MarkersConfig />
		</>
	);
};

export default EditorConfig;
