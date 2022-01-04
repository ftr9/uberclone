import { combineReducers } from "redux";
import { SetOrigin, SetDestination, SetTravelTimeInformation } from "./reducers";

const allReducers = combineReducers({
    origin: SetOrigin,
    destination: SetDestination,
    travelTimeInformation: SetTravelTimeInformation
});

export default allReducers;