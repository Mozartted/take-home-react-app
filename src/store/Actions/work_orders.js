import actionType from '../action-type';
import cookies from "js-cookie"


/**
 * Login for the application
 * @param {*} params 
 */
export const setWorkOrders = (params) => (dispatch, getstate) => new Promise(async (resolve, reject)=>{
	let workOrders = params.workorders
	await dispatch({
		type: actionType.SET_WORK_ORDERS,
		data: workOrders
	})
	resolve()
}).catch(err=>{
	throw err
})
