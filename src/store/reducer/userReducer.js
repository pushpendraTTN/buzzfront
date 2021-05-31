import * as actiontypes from '../action/actiontype';
const userData = {
        id: '',
        name: '',
        pic: '',
        email: '',
        designation:'',
        website: '',
        role:'',
        noOfFriends:''
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
                website: action.payload.website,
                role: action.payload.role,
                noOfFriends: action.payload.noOfFriends,
                city:action.payload.city,
                state:action.payload.state,
                zip:action.payload.zipCode,
                dob:action.payload.dob,
                fname:action.payload.fname,
                lname:action.payload.lname
            }
            case actiontypes.VIEW_USER: return {
                ...state,
                id: action.payload.id,
            }
            case actiontypes.CLEAR_USER: return {
                
            }
            default: return state
        }
    }
export default reducer;
