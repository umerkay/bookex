import { createContext, useReducer } from 'react'

export const UserContext = createContext();

export const UserProvider = ({children}) => {

    const initialState = {
        user: null,
        token: null,
        isLoggedIn: false,
        isLoading: false,
        error: null
    }

    const reducer = (state, action) => {
        console.log(state,action);
        switch(action.type) {
            case 'LOGIN':
                return {
                    ...state,
                    user: action.payload.user,
                    token: action.payload.token,
                    isLoggedIn: true,
                    isLoading: false,
                    error: null
                }
            case 'LOGOUT':
                return {
                    ...state,
                    user: null,
                    token: null,
                    isLoggedIn: false,
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
