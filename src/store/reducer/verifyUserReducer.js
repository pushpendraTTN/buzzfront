import * as actiontypes from '../action/actiontype';

const initialState = {
    token: ''
}
const reducer = (state=initialState,action)=>{
        switch(action.type){
            case actiontypes.STORE_TOKEN: return{
                ...state,
                token:action.payload
            }
            default: return state
        }
    }
export default reducer;
