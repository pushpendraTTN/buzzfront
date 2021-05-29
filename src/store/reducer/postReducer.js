import * as actiontypes from '../action/actiontype';
const otherUserData = {
        id: ''
    }


    const reducer = (state = otherUserData, action) => {
        // console.log(action);
        switch(action.type) {
            case actiontypes.VIEW_USER_PROFILE: return {
                ...state,
                id: action.payload,
            }
            default: return state
        }
    }
export default reducer;
