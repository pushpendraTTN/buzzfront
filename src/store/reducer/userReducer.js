import * as actiontypes from '../action/actiontype';
const userData = {
        id: '',
        name: '',
        pic: '',
        email: '',
        designation:'',
        website: ''
    }


    const reducer = (state = userData, action) => {
        switch(action.type) {
            case actiontypes.FETCH_USER: return {
                ...state
            }
            case actiontypes.CHANGE_USER: return {
                ...state,
                name: action.payload.name,
                pic: action.payload.profile_pic,
                email: action.payload.email,
                designation: action.payload.designation,
                website: action.payload.website
            }
            default: return state
        }
    }
export default reducer;
