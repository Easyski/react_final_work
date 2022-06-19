import { FC, useEffect, useCallback, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import mapboxgl, { GeoJSONSource, Map } from "mapbox-gl";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { toast } from "react-toastify";
import { Position } from "geojson";

import {
	setAddMarkerList,
	setSelectedMarkerIndex,
	setAddTrackList,
} from "@/store/slices";
import { ICoordinates, IMarker, IMode, ITrack } from "@/components/types";
import { getAltitude, findMarkerInList } from "@/hooks";
import { RiGuideLine } from "react-icons/ri";

export const Navigation: FC = () => {
	const dispatch = useDispatch();
	const zoom = useSelector((state: any) => state.map.zoom);
	const mode: IMode = useSelector((state: any) => state.topbar.mode);
	const markerList: IMarker[] = useSelector(
		(state: any) => state.sidebar.markerList
	);
	const trackList: ITrack[] = useSelector(
		(state: any) => state.sidebar.trackList
	);
	const center: ICoordinates = useSelector(
		(state: any) => state.map.centerCoordinates
	);

	const map = useRef<Map>();
	const mapContainer = useRef<HTMLDivElement | null>(null);
	const [markerClicked, setMarkerClicked] = useState<IMarker>();
	const [newMarker, setNewMarker] = useState<IMarker>();

	const [trackMarkers, setTrackMarkers] = useState<IMarker[]>([]);

	/**
	 * Initialise map with set parameters
	 * ( Executed on startup )
	 */
	useEffect(() => {
		if (map.current || !mapContainer.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/streets-v9",
			center: center,
			maxZoom: 15,
			minZoom: 4,
			doubleClickZoom: false,
			pitchWithRotate: false,
			dragRotate: false,
		});

		map.current.on("load", () => {
			map.current!.addSource("tracks", {
				type: "geojson",
				data: {
					type: "FeatureCollection",
					features: [],
				},
			});
			map.current!.addLayer({
				id: "track-layer",
				type: "line",
				source: "tracks",
				layout: {
					"line-join": "round",
					"line-cap": "round",
				},
				paint: {
					"line-color": "#888",
					"line-width": 8,
				},
			});
		});
	});

	/**
	 * Listens to @param center and moves the map to the new center.
	 */
	useEffect(() => {
		if (!map.current) return;
		map.current.flyTo({
			center,
			duration: 1500,
			zoom,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [center]);

	/**
	 * Listens to the @param mode and adds an eventlistener on every
	 * click if the @param mode is set to "points".
	 * */
	useEffect(() => {
		if (!map.current) return;
		if (mode === "points") {
			map.current.on("click", callbackOnClick);
			return;
		}
		map.current.off("click", callbackOnClick);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mode]);

	/**
	 * This function is called whenver a new marker is placed on the map. It
	 * adds the coordinates to the @param markerList array in the store. This
	 * cannot be done in the @function handleMapClick because it is memoised
	 * and therefor unable to retrieve the previous markers.
	 */
	useEffect(() => {
		if (!newMarker) return;
		dispatch(setAddMarkerList(newMarker));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newMarker]);

	/**
	 * Triggers the visual response on the map when a marker is clicked
	 * according to the @param mode the user has set.
	 */
	useEffect(() => {
		if (!markerClicked) return;
		switch (mode) {
			case "points": {
				const index = findMarkerInList(markerClicked, markerList);
				if (index !== null) {
					toast.info("This marker is already in the list");
					dispatch(setSelectedMarkerIndex(index));
					return;
				}
				dispatch(
					setAddMarkerList({
						name: "",
						isUsed: false,
						coordinates: markerClicked,
					})
				);
				return;
			}
			case "tracks": {
				setTrackMarkers([...trackMarkers, markerClicked]);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [markerClicked]);

	/**
	 * This function gets triggered whenever a new marker is selected in order
	 * to create a new track. Only when two markers are selected, this function
	 * gets triggered and the @param trackMarkers gets cleared.
	 */
	useEffect(() => {
		if (trackMarkers.length === 1) {
			toast("First marker selected!", {
				autoClose: 1000,
				icon: <RiGuideLine />,
			});
			return;
		}
		if (trackMarkers.length !== 2 || !map.current) return;

		// transform ICoordinates to Position
		const track: Position[] = [
			[trackMarkers[0].coordinates.lng, trackMarkers[0].coordinates.lat],
			[trackMarkers[1].coordinates.lng, trackMarkers[1].coordinates.lat],
		];

		const coordsArray = trackList.map((el) => {
			return el.coordinates;
		});

		const trackGeoJson: any = {
			type: "Feature",
			properties: {},
			geometry: {
				type: "MultiLineString",
				coordinates: [...coordsArray, track],
			},
		};
		// Add GeoJSON to track layer
		if (map.current.getStyle().layers.find((el) => el.id === "track-layer")) {
			(map.current.getSource("tracks") as GeoJSONSource).setData(trackGeoJson);
			dispatch(
				setAddTrackList({ name: "", isUsed: false, coordinates: track })
			);
		}
		setTrackMarkers([]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [trackMarkers]);

	/**
	 * Memoised function without dependencies, which means every reload it
	 * will be the exact same function in memory. This is a nescessity so that
	 * the eventlistener that handles the "click" event on the map can be
	 * toggled.
	 */
	const callbackOnClick = useCallback((evt: mapboxgl.MapMouseEvent) => {
		handleMapClick(evt);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	/**
	 * The function to be excecuted when the editor allows new markers to be
	 * placed.
	 * @param evt The Mapbox GL mouse-event from which we get the lat- and
	 * longtitude.
	 */
	const handleMapClick = async (evt: mapboxgl.MapMouseEvent) => {
		if (!map.current) return;
		const { lng, lat } = evt.lngLat;
		const alt = await getAltitude(lat, lng);

		const newMarkerObj: IMarker = {
			name: "",
			isUsed: false,
			coordinates: {
				lat,
				lng,
				alt,
			},
		};

		// MARKER
		const markerEl = document.createElement("div");
		markerEl.className = "marker";
		const marker = new mapboxgl.Marker(markerEl)
			.setLngLat([lng, lat])
			.addTo(map.current);

		marker
			.getElement()
			.addEventListener("click", () => setMarkerClicked(newMarkerObj));

		// SET NEW MARKER
		setNewMarker(newMarkerObj);
		// TOAST
		toast("Your marker has been set!", {
			icon: <HiOutlineLocationMarker />,
			progressClassName: "marker-toast",
		});
	};

	return (
		<div className="navigation-container">
			<div ref={mapContainer} className="navigation" />
		</div>
	);
};

export default Navigation;
