import reduceReducers from "../../utils/reduce-reducers";
import initialState from './inital-state';
import actionType from '../action-type';
import _ from 'lodash';
import { insertItem, removeItem } from '../../utils/helpers';
// import { combineReducers } from "redux";

const INITIAL_STATE = initialState;


let workOrderReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case actionType.SET_WORK_ORDERS:
			return {
				...state,
				work_orders: action.data
			};
			break;
		default: return state;
	}
};


const rootReducer = reduceReducers(
	workOrderReducer
);


export default rootReducer;
