import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../../store/slices/editorSlice";

import "./EditorConfig.css";

const EditorConfig: FC = () => {
	const dispatch = useDispatch();
	const editorMode = useSelector((state: any) => state.editor.mode);

	useEffect(() => {
		// console.log(editorMode);
	}, [editorMode]);

	const handleSelectorClick = (mode: "points" | "tracks" | "routes") => {
		if (mode !== editorMode) return dispatch(setMode(mode));
		dispatch(setMode("null"));
	};

	return (
		<div className="editorContainer">
			<div
				className="editorSelector"
				onClick={() => handleSelectorClick("points")}
			>
				1
			</div>
			<div
				className="editorSelector"
				onClick={() => handleSelectorClick("routes")}
				defaultValue="tracks"
			>
				2
			</div>
			<div
				className="editorSelector"
				onClick={() => handleSelectorClick("tracks")}
				defaultValue="routes"
			>
				3
			</div>
		</div>
	);
};

export default EditorConfig;
