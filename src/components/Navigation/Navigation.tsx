import { FC, useEffect, useCallback, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import mapboxgl, { Map } from "mapbox-gl";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { toast } from "react-toastify";

import { setMarkerList, setSelectedMarkerIndex } from "../../store/slices";
import { ICoordinates } from "../types";
import { INavigationTypes } from "./Navigation.types";
import { getAltitude, findMarkerInList } from "../../hooks";

export const Navigation: FC<INavigationTypes> = () => {
	const dispatch = useDispatch();
	const zoom = useSelector((state: any) => state.map.zoom);
	const center: ICoordinates = useSelector(
		(state: any) => state.map.centerCoordinates
	);
	const editorMode = useSelector((state: any) => state.topbar.mode);
	const markerList: ICoordinates[] = useSelector(
		(state: any) => state.sidebar.markerList
	);

	const map = useRef<Map>();
	const mapContainer = useRef<HTMLDivElement | null>(null);
	const [markerClicked, setMarkerClicked] = useState<ICoordinates>();
	const [newMarkerCoordinates, setNewMarkerCoordinates] =
		useState<ICoordinates>();

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
			minZoom: 5,
			doubleClickZoom: false,
			pitchWithRotate: false,
			dragRotate: false,
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
	 * Listens to the @param editorMode and adds an eventlistener on every
	 * click if the @param editorMode is set to "points".
	 * */
	useEffect(() => {
		if (!map.current) return;
		if (editorMode === "points") {
			map.current.on("click", callbackOnClick);
			return;
		}
		map.current.off("click", callbackOnClick);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editorMode]);

	/**
	 * This function is called whenver a new marker is placed on the map. It
	 * adds the coordinates to the @param markerList array in the store. This
	 * cannot be done in the @function handleMapClick because it is memoised
	 * and therefor unable to retrieve the previous markers.
	 */
	useEffect(() => {
		if (markerList[0]) {
			dispatch(setMarkerList([...markerList, newMarkerCoordinates]));
			return;
		}
		dispatch(setMarkerList([newMarkerCoordinates]));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newMarkerCoordinates]);

	useEffect(() => {
		if (!markerClicked) return;
		const index = findMarkerInList(markerClicked, markerList);
		console.log(index);
		if (index !== null) {
			toast.info("This marker is already in the list");
			dispatch(setSelectedMarkerIndex(index));
			return;
		}
		dispatch(setMarkerList([...markerList, markerClicked]));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [markerClicked]);

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

		// MARKER
		const markerEl = document.createElement("div");
		markerEl.className = "marker";
		const marker = new mapboxgl.Marker(markerEl)
			.setLngLat([lng, lat])
			.addTo(map.current);

		marker
			.getElement()
			.addEventListener("click", () => setMarkerClicked({ lat, lng, alt }));

		// COORDINATES
		setNewMarkerCoordinates({ lat, lng, alt });
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
