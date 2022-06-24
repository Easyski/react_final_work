import { FC, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BiDownload } from "react-icons/bi";
import { ReactSortable } from "react-sortablejs";
import downloasjs from "downloadjs";

import { MarkerOption, RouteOption, TrackOption } from "@/components";
import { IMarker, IMode, ITrack, ITrackWithId } from "@/components/types";
import { Logo } from "@/assets";
import { setExplanation } from "@/store/slices";
import { toast } from "react-toastify";

const Sidebar: FC = () => {
	const dispatch = useDispatch();

	// -------------------------------------------------------------------
	// :: VARIABLES
	// -------------------------------------------------------------------

	const mode: IMode = useSelector((store: any) => store.topbar.mode);
	const explanation = useSelector((store: any) => store.sidebar.explanation);
	const markerList: IMarker[] = useSelector(
		(store: any) => store.marker.markerList
	);
	const trackList: ITrack[] = useSelector(
		(store: any) => store.track.trackList
	);

	// -------------------------------------------------------------------
	// :: STATES
	// -------------------------------------------------------------------

	const [routeName, setRouteName] = useState<string>("");
	const [modeToUse, setModeToUse] = useState<IMode>(null);
	const [trackListWithId, setTrackListWithId] = useState<ITrackWithId[]>();

	const scrollElement = useRef<HTMLDivElement>(null);

	// -------------------------------------------------------------------
	// :: EFFECTS
	// -------------------------------------------------------------------

	useEffect(() => {
		if (!scrollElement.current) return;
		scrollElement.current.scrollTop = scrollElement.current.scrollHeight;
	}, [markerList]);

	useEffect(() => {
		if (!trackList.length) return;
		const newListWithId: ITrackWithId[] = trackList.map((track, i) => {
			return {
				...track,
				id: i + 1,
			};
		});
		setTrackListWithId(newListWithId);
	}, [trackList]);

	useEffect(() => {
		switch (mode) {
			case "points": {
				setModeToUse("points");
				explanation && dispatch(setExplanation(false));
				break;
			}
			case "tracks": {
				setModeToUse("tracks");
				explanation && dispatch(setExplanation(false));
				break;
			}
			case "routes": {
				setModeToUse("routes");
				explanation && dispatch(setExplanation(false));
				break;
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mode]);

	// -------------------------------------------------------------------
	// :: MARKERS
	// -------------------------------------------------------------------

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

	// -------------------------------------------------------------------
	// :: TRACKS
	// -------------------------------------------------------------------

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

	// -------------------------------------------------------------------
	// :: ROUTES
	// -------------------------------------------------------------------

	const handleRoutes = (): JSX.Element[] | JSX.Element => {
		if (!trackListWithId || !trackListWithId.length)
			return (
				<p className="light italic font-md text-center margin-top-lg">
					Click a track to view its stats or add one via the control panel.
				</p>
			);
		return (
			<>
				<div className="route">
					<input
						className="input bold color-blue"
						type="text"
						placeholder="Name (required)"
						autoComplete="off"
						autoFocus
						value={routeName}
						onChange={(e) => setRouteName(e.target.value)}
					/>
					<ReactSortable
						list={trackListWithId}
						setList={setTrackListWithId}
						ghostClass="sort-placeholder"
						disabled={false}
						animation={200}
						swapThreshold={0.35}
					>
						{trackListWithId.map((track) => (
							<RouteOption key={track.id} track={track} />
						))}
					</ReactSortable>
				</div>
				<div
					className="download flex flex-h align-center pointer"
					onClick={handleDownloadClick}
				>
					<p className="color-blue bolder inline">Generate .gpx file</p>
					<BiDownload className="icon-download color-blue" />
				</div>
			</>
		);
	};

	const handleDownloadClick = async () => {
		if (!trackListWithId) return;
		const coordsArray = trackListWithId.map((el) => {
			return el.coordinates;
		});

		if (routeName.trim() === "") {
			toast.error("Your route needs a name!");
			return;
		}

		const geoJson: any = {
			type: "Feature",
			properties: {},
			geometry: {
				type: "MultiLineString",
				coordinates: coordsArray,
			},
		};
		const fileName = routeName.trim();
		const res = await fetch(
			`https://easyski-api-final-work.herokuapp.com/gpx`,
			{
				headers: {
					"Content-type": "application/json",
				},
				method: "POST",
				body: JSON.stringify({
					geoJson,
					name: fileName,
				}),
			}
		);
		const file = await res.blob();
		downloasjs(file, `${fileName}.gpx`);
	};

	// -------------------------------------------------------------------
	// :: RENDER
	// -------------------------------------------------------------------

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
				return handleRoutes();
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
		<div className="font-md">
			<p>
				Welcome to <span className="bold color-blue">Easyski</span>! <br /> If
				you are not sure where to start, check out this brief summary of what
				you can do with me! <br />
			</p>
			<br />
			<br />
			<br />
			<ol>
				<li>
					<span className="bold color-blue">1.</span> Search your desired
					location at the top.
				</li>
				<br />
				<li>
					<span className="bold color-blue">2.</span> Add markers using the{" "}
					<span className="bold">marker</span> option at the top.
				</li>
				<br />
				<li>
					<span className="bold color-blue">3.</span> Connect your markers with
					the <span className="bold">track</span> tool.
				</li>
				<br />
				<li>
					<span className="bold color-blue">4.</span> Name your tracks and
					proceed to the final step: the <span className="bold">route </span>
					tool.
				</li>
				<br />
				<li>
					<span className="bold color-blue">5.</span> Change the order of the
					tracks untill you are satisfied, then download the .gpx file at the
					bottom.
				</li>
			</ol>
			<br />
			<br />
			<br />
			<p>
				Thank you for using <span className="bold color-blue">Easyski</span>!
			</p>
		</div>
	);

	return (
		<div className="sidebar border-box flex flex-v">
			<img src={Logo} alt="Easyski Logo" className="logo align-self-center" />
			<div className="scroll-container" id="scrollElement" ref={scrollElement}>
				{renderContent()}
			</div>
		</div>
	);
};

export default Sidebar;
