import { createStore, applyMiddleware } from "redux";
import {persistStore, persistReducer} from 'redux-persist';
import storage from "redux-persist/lib/storage";
import rootReducer from "./Reducers";
import thunk from "redux-thunk";
// import initialState from "./Reducers/inital-state"
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

const persistConfig = {
	key: 'root',
	storage,
	stateReconciler: autoMergeLevel2
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore(initialState = initialState) {
	let store = createStore(persistedReducer, applyMiddleware(thunk));
	let persistor = persistStore(store);
  	return {
		store, persistor
  	}
}


// export function configureStoreDev(initialState = initialState) {
// 	let store = createStore(
// 		persistedReducer,
// 		composeWithDevTools(applyMiddleware(thunk, reduxImmutableStateInvariant()))
// 	);
// 	let persistor = persistStore(store);
// 	return { store, persistor };
// }
