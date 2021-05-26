import * as actionTypes from './actionTypes'
import axios from 'axios';

export const fetch_user = (name) => {
    return {
        type: actionTypes.FETCH_USER,
    }
}