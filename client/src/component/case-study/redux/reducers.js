import { LOGIN_SUCCESS, RESET, SIGN_UP_SUCCESS, LOADING, LOGIN_FAIL, VIEW_HOMEPAGE_FAIL, VIEW_HOMEPAGE_SUCCESS, SIGN_UP_FAIL, CHANGE_PROFILE_SUCCESS, CHANGE_PROFILE_FAIL } from "./actions";
import Cookies from 'universal-cookie';
const cookies = new Cookies(); 

const initialState = {
    goods: [],
    isLoading: false,
    message: '',
    isSignUp: false,
}

function rootReducerCaseStudy(state = initialState, action) {
    let _state = {...state};
    let d = new Date();
    d.setTime(d.getTime() + (30*60*1000));
    switch(action.type) {
        case LOGIN_SUCCESS:
            // Set saving time of Cookie
            cookies.set('username', action.payload.account.username, {path: "/", expires: d});
            cookies.set('password', action.payload.account.password, {path: "/", expires: d}); 

            _state = {..._state, isLoading: action.payload.isLoading, message: action.payload.message, isSignUp: action.payload.isSignUp}
            console.log(_state);
            break;
        case SIGN_UP_SUCCESS:
            console.log('cc');
            console.log(action.payload);
            _state = {..._state, isLoading: action.payload.isLoading, message: action.payload.message, isSignUp: action.payload.isSignUp}
            console.log(_state);
            break;
        case LOGIN_FAIL:
            _state = {..._state, isLoading: action.payload.isLoading, message: action.payload.message}
            console.log(_state);
            break;
        case SIGN_UP_FAIL:
            _state = {..._state, isLoading: action.payload.isLoading, message: action.payload.message}
            console.log(_state);
            break;
        case VIEW_HOMEPAGE_SUCCESS:
            _state = {..._state, goods: action.payload.goods, isLoading: action.payload.isLoading}
            console.log(_state);
            break;
        case VIEW_HOMEPAGE_FAIL:
            _state = {..._state, message: action.payload.message, isLoading: action.payload.isLoading}
            console.log(_state);
            break;
        case CHANGE_PROFILE_SUCCESS:
            // Set saving time of Cookie
            cookies.set('username', action.payload.account.username, {path: "/", expires: d});
            cookies.set('password', action.payload.account.password, {path: "/", expires: d}); 

            _state = {..._state, message: action.payload.message, isLoading: action.payload.isLoading};
            console.log(_state);
            break;
        case CHANGE_PROFILE_FAIL:
            _state = {..._state, message: action.payload.message, isLoading: action.payload.isLoading}
            console.log(_state);
            break;
        case RESET:
            _state = {..._state, [action.payload.key]: action.payload.data}
            console.log(_state);
            break;
        case LOADING:
            _state = {..._state, isLoading: action.payload};
            console.log(_state);
            break;
        default:
            break;
    }
    return _state;
}

export default rootReducerCaseStudy