import { UPDATE_STATE } from "../constants/actionTypes";
export const updateAppState = (obj) => ({type: UPDATE_STATE, payload: obj});