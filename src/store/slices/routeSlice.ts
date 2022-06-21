import { IRoute } from "@/components/types";
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
	routeList: IRoute[];
	selectedRouteIndex?: number;
}

const initialState: IInitialState = {
	routeList: [],
};

export const routeSlice = createSlice({
	name: "routeSlice",
	initialState,
	reducers: {
		// -----------
		// :: RouteS
		// -----------
		setAddRouteList: (state, action) => {
			state.routeList.push(action.payload);
		},
		setClearRouteList: (state) => {
			state.routeList = [];
		},
		setOverrideRouteList: (state, action) => {
			state.routeList = action.payload;
		},
		setSelectedRouteIndex: (state, action) => {
			state.selectedRouteIndex = action.payload;
		},
		setUpdateRoute: (state, action) => {
			// ACTION : [Route, INDEX]
			state.routeList[action.payload[1]] = action.payload[0];
		},
	},
});

export const {
	setAddRouteList,
	setClearRouteList,
	setOverrideRouteList,
	setSelectedRouteIndex,
	setUpdateRoute,
} = routeSlice.actions;

export default routeSlice.reducer;
