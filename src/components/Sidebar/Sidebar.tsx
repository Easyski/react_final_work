import { FC, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { MarkerOption, TrackOption } from "@/components";
import { IMarker, IMode, ITrack } from "@/components/types";
import { setExplanation } from "@/store/slices";

const Sidebar: FC = () => {
	const dispatch = useDispatch();
	const mode: IMode = useSelector((store: any) => store.topbar.mode);
	const explanation = useSelector((store: any) => store.sidebar.explanation);
	const markerList: IMarker[] = useSelector(
		(store: any) => store.sidebar.markerList
	);
	const trackList: ITrack[] = useSelector(
		(store: any) => store.sidebar.trackList
	);

	const [modeToUse, setModeToUse] = useState<IMode>(null);
	const [title, setTitle] = useState<string>("");
	const [subtitle, setSubtitle] = useState<string>("");

	const scrollElement = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!scrollElement.current) return;
		scrollElement.current.scrollTop = scrollElement.current.scrollHeight;
	}, [markerList]);

	/**
	 * Determine which mode is selected and change the title and subtitle
	 * accordingly.
	 */
	useEffect(() => {
		switch (mode) {
			case "points": {
				setTitle("Markers");
				setSubtitle("Click a marker in the list to focus");
				setModeToUse("points");
				explanation && dispatch(setExplanation(false));
				break;
			}
			case "tracks": {
				setTitle("Tracks");
				setSubtitle("Click a track in the list to focus");
				setModeToUse("tracks");
				explanation && dispatch(setExplanation(false));
				break;
			}
			case "routes": {
				setTitle("Routes");
				setSubtitle("Click a route in the list to display");
				setModeToUse("routes");
				explanation && dispatch(setExplanation(false));
				break;
			}
			default: {
				if (explanation) {
					setTitle("How To Use?");
					setSubtitle("");
					break;
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mode]);

	/**
	 * This is the function that handles the addition of markers in the sidebar.
	 * It gets triggered every time the @param markerList is updated.
	 * @returns Either one element or an array of elements.
	 */
	const handleMarkers = (): JSX.Element[] | JSX.Element => {
		if (!markerList.length)
			return (
				<p className="light italic font-md text-center margin-top-lg">
					Click a marker to view its stats or add one via the control panel.
				</p>
			);
		const markersAsElements: JSX.Element[] = markerList.map(
			(marker: IMarker, index: number) => {
				return <MarkerOption marker={marker} key={index} indexInList={index} />;
			}
		);

		return markersAsElements;
	};

	/**
	 * This is the function that handles the addition of tracks in the sidebar.
	 * It gets triggered every time the @param tracksToBeAdded is updated.
	 * @returns Either one element or an array of elements
	 */
	const handleTracks = (): JSX.Element[] | JSX.Element => {
		if (!trackList.length)
			return (
				<p className="light italic font-md text-center margin-top-lg">
					Click a track to view its stats or add one via the control panel.
				</p>
			);
		const tracksAsElements: JSX.Element[] = trackList.map(
			(track: ITrack, index: number) => {
				return <TrackOption track={track} key={index} indexInList={index} />;
			}
		);
		return tracksAsElements;
	};

	/**
	 * This is the first function to be called. It determins what should be
	 * rendered based on the mode that is selected via the control panel.
	 * @returns Either one JSX element or an array of elements
	 */
	const renderContent = (): JSX.Element | JSX.Element[] => {
		switch (modeToUse) {
			case "points":
				return handleMarkers();
			case "tracks":
				return handleTracks();
			case "routes":
				return handleTracks();
			default:
				return handleDefault();
		}
	};

	/**
	 * This is the default function that handles the explanation content in
	 * the sidebar. It gets triggered every time the @param tracksToBeAdded is
	 * updated.
	 * @returns A JSX element.
	 */
	const handleDefault = (): JSX.Element => (
		<p className="font-md">
			Welcome to <span className="bold">Easyski</span>! <br /> If you are nog
			sure where to start, check out this brief summary of what you can do with
			me! <br />
			Thank you for using <span className="bold">Easyski</span>!
		</p>
	);

	return (
		<div className="sidebar border-box">
			<h3 className="title bold font-xl text-center">{title}</h3>
			<p className="subtitle thin italic font-sm text-center">{subtitle}</p>
			<div className="scroll-container" id="scrollElement" ref={scrollElement}>
				{renderContent()}
			</div>
		</div>
	);
};

export default Sidebar;
