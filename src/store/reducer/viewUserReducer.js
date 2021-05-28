import * as actiontypes from '../action/actiontype';
const otherUserData = {
        id: ''
    }


    const reducer = (state = otherUserData, action) => {
        switch(action.type) {
            case actiontypes.VIEW_USER_PROFILE: return {
                ...state,
                id: action.payload.id,
            }
            default: return state
        }
    }
export default reducer;
