import { createContext, useReducer } from 'react'

export const UserContext = createContext();

export const UserProvider = ({children}) => {

    const initialState = {
        user: null,
        //get token from local storage
        token: localStorage.getItem('token') || null,
        isLoggedIn: false,
        isLoading: false,
        error: null
    }

    const reducer = (state, action) => {
        switch(action.type) {
            case 'LOGIN':
                //set token in local storage
                localStorage.setItem('token', action.payload.token);

                return {
                    ...state,
                    user: action.payload.user,
                    token: action.payload.token,
                    isLoggedIn: true,
                    isLoading: false,
                    error: null
                }
            case 'USER_LOADED':
                return {
                    ...state,
                    user: action.payload.user,
                    isLoggedIn: true,
                    isLoading: false,
                    error: null
                }
            case 'LOGOUT':
                //remove token from local storage
                localStorage.removeItem('token');
                return {
                    ...state,
                    user: null,
                    token: null,
                    isLoggedIn: false,
                    isLoading: false,
                    error: null
                }
            case 'UPDATE_DETAILS':
                return {
                    ...state,
                    user: action.payload.user,
                    isLoading: false,
                    error: null
                }
            case 'LOADING':
                return {
                    ...state,
                    isLoading: true
                }
            case 'ERROR':
                return {
                    ...state,
                    error: action.payload.error,
                    isLoading: false
                }
            case 'CLEAR_ERROR':
                return {
                    ...state,
                    error: null
                }

            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)



    return (
        <UserContext.Provider value={{...state, dispatch}}>
            {children}
        </UserContext.Provider>
    )
}
