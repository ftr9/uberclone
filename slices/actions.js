import { DISTANCE_MATRIXAPI } from '@env';

export const SET_ORIGIN = (payload) => {
    return { type: 'SET_ORIGIN', payload }
}
export const SET_DESTINATION = (payload) => {
    return {
        type: 'SET_DESTINATION',
        payload
    };
}
export const SET_TRAVELTIME_INFORMATION = () => {
    return async (dispatch, getState) => {
        const originAndDestinnation = getState();

        const result = await fetch(`https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${originAndDestinnation.origin.description}&destinations=${originAndDestinnation.destination.description}&transit_mode=bus|train|tram|subway&
         mode=transit&departure_time=now&key=${DISTANCE_MATRIXAPI}`);
        const finalDistance = await result.json();
        dispatch({ type: 'GET_TRAVELINFO', payload: finalDistance.rows[0].elements[0] });

    }
}