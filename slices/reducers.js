const setOrign_State = {
}

export const SetOrigin = (state = setOrign_State, action) => {
    if (action.type === 'SET_ORIGIN') {
        return action.payload;
    }
    return state;
}

const setDetination_State = {
}
export const SetDestination = (state = setDetination_State, action) => {
    if (action.type === 'SET_DESTINATION') {
        return action.payload;
    }
    return state;
}

const setTravelInformation_State = {
}
export const SetTravelTimeInformation = (state = setTravelInformation_State, action) => {
    if (action.type === 'GET_TRAVELINFO') {
        return action.payload;
    }
    return state;
}

