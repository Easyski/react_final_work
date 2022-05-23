import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, batch } from "react-redux";
import mapboxgl, { Map } from "mapbox-gl";
import { ToggleSlider } from "react-toggle-slider";

import { setCenterCoordinates, setZoom } from "../../store/slices";
import { ICoordinates } from "../types";

const MarkerOption: FC<{ coordinates: ICoordinates }> = ({ coordinates }) => {
	const dispatch = useDispatch();

	const [isGuide, setIsGuide] = useState<boolean>(false);
	const map = useRef<Map>();
	const smallMapContainer = useRef<HTMLDivElement | null>(null);

	/**
	 * Initialise map with set parameters
	 * ( Executed on startup )
	 */
	useEffect(() => {
		if (map.current || !smallMapContainer.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: smallMapContainer.current,
			style: "mapbox://styles/mapbox/streets-v9",
			center: coordinates,
			zoom: 15,
			interactive: false,
		});

		new mapboxgl.Marker({ color: "rgba(221, 147, 147, 0.5)" })
			.setLngLat(coordinates)
			.addTo(map.current);
	});

	const handleMapClicked = () => {
		batch(() => {
			dispatch(setZoom(11.5));
			dispatch(setCenterCoordinates(coordinates));
		});
	};

	const handleButtonClicked = (accept: boolean) => {
		console.log(accept);
	};

	return (
		<div className="marker-option grid animate__fadeInLeft font-md">
			<input
				className="input italic"
				type="text"
				placeholder="Name (optional)"
				autoComplete="off"
			/>
			<div
				ref={smallMapContainer}
				className="small-map"
				onClick={handleMapClicked}
			/>
			<div className="flex flex-h">
				<p>
					<span className={!isGuide ? "bold" : "regular"}>Main point</span> /
					<span className={isGuide ? "bold" : "regular"}>Guide</span>
				</p>
				<ToggleSlider
					onToggle={(toggle) => setIsGuide(toggle)}
					barHeight={20}
					barWidth={40}
					handleSize={12}
					barStyles={{ marginLeft: 20 }}
					handleStyles={{ marginLeft: 20 }}
					draggable={true}
				/>
			</div>
			<p>
				<span className="bold">Longitude: </span>
				{coordinates.lng.toFixed(4)}
			</p>
			<p>
				<span className="bold">Latitude: </span>
				{coordinates.lat.toFixed(4)}
			</p>
			<p>
				<span className="bold">Altitude: </span>
				{coordinates.alt ? coordinates.alt.toFixed(4) : 0}
			</p>
			<div className="flex flex-h justify-evenly">
				<button
					onClick={() => handleButtonClicked(true)}
					className="marker-button bold border"
				>
					<p>Save</p>
				</button>
				<button
					onClick={() => handleButtonClicked(false)}
					className="marker-button"
				>
					<p>Delete</p>
				</button>
			</div>
		</div>
	);
};

export default MarkerOption;
