import mapboxgl, { Map } from "mapbox-gl";
import { FC, useEffect, useRef } from "react";
import { useDispatch, batch } from "react-redux";
import { BsCheckLg } from "react-icons/bs";
import { GiCancel } from "react-icons/gi";

import { setCenterCoordinates, setZoom } from "../../../../store/slices";
import { Coordinates } from "../../../types";

import "./MarkerOption.scss";
import "animate.css";

const MarkerOption: FC<{ center: Coordinates }> = ({ center }) => {
	const dispatch = useDispatch();

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
			center: center,
			zoom: 15,
			interactive: false,
		});

		new mapboxgl.Marker({ color: "rgb(221, 147, 147)" })
			.setLngLat(center)
			.addTo(map.current);
	});

	const handleMapClicked = () => {
		batch(() => {
			dispatch(setZoom(11.5));
			dispatch(setCenterCoordinates(center));
		});
	};

	const handleButtonClicked = (accept: boolean) => {
		if (accept) {
		}
	};

	return (
		<div className="markerOptionContainer animate__animated animate__fadeInRight">
			<div
				ref={smallMapContainer}
				className="smallMapContainer"
				onClick={handleMapClicked}
			/>
			<input
				className="markerOptionInput"
				type="text"
				placeholder="Name (optional)"
				autoComplete="off"
			/>
			<p>
				<b>Coordinates</b>
			</p>
			<p className="markerOptionCoordinate">
				x: {(center[0] as number).toFixed(4)}
			</p>
			<p className="markerOptionCoordinate">
				y: {(center[1] as number).toFixed(4)}
			</p>
			<button
				onClick={() => handleButtonClicked(true)}
				className="markerOptionButton markerOptionButton__accept"
			>
				<BsCheckLg />
			</button>
			<button
				onClick={() => handleButtonClicked(false)}
				className="markerOptionButton markerOptionButton__delete"
			>
				<GiCancel />
			</button>
		</div>
	);
};

export default MarkerOption;
