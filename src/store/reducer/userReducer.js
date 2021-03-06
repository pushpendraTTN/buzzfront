import * as actiontypes from '../action/actiontype';

const initialState = {
    user: {}
}
const reducer = (state=initialState,action)=>{
        switch(action.type){
            case actiontypes.FETCH_USER: return{
                ...state,
                user:action.payload
            }
            default: return state
        }
    }
export default reducer;
