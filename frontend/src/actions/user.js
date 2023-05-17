import axios from 'axios';

export const login = async function (formData, dispatch) {

    dispatch({type: 'LOADING'});
    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (response.status === 200) {
            dispatch({type: 'LOGIN', payload: {user: data.user, token: data.token}});
            return true;
            // callback();
        } else {
            dispatch({type: 'ERROR', payload: {error: data.message}});
        }
    } catch (error) {
        dispatch({type: 'ERROR', payload: {error: error.message}});
    }

    // dispatch({type: 'LOGIN', payload: {user: formData.email, token: "token"}})

}

export const getUserInfo = async function (token, dispatch) {

    dispatch({type: 'LOADING'});
    try {

        const response = await fetch('/api/users/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
        });

        const data = await response.json();
        if (response.status === 200) {
            dispatch({type: 'USER_LOADED', payload: {user: data.user}});
        } else {
            dispatch({type: 'ERROR', payload: {error: data.message}});
        }
    } catch (error) {
        dispatch({type: 'ERROR', payload: {error: error.message}});
    }

    // dispatch({type: 'LOGIN', payload: {user: formData.email, token: "token"}})

}

export const register = async function (formData, dispatch) {
    
    dispatch({type: 'LOADING'});
    try {
        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (response.status === 201) {
            dispatch({type: 'REGISTER', payload: {token: data.token}});
            return true;
        } else {
            dispatch({type: 'ERROR', payload: {error: data.message}});
        }
    } catch (error) {
        dispatch({type: 'ERROR', payload: {error: error.message}});
    }

    // dispatch({type: 'REGISTER', payload: {user: formData.email, token: "token"}})

}

export const logout = async function (token, dispatch) {
    fetch('/api/users/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
        }
    });
    dispatch({type: 'LOGOUT'})
    
}
//post to /api/users/updatedetails

export const updateDetails = async function (updates, token, dispatch) {
    dispatch({type: 'LOADING'});
    try {
        const response = await fetch('/api/users/updatedetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify(updates)
        });
        const data = await response.json();
        if (response.status === 200) {
            dispatch({type: 'UPDATE_DETAILS', payload: {user: data.user}});
            return true;
        } else {
            dispatch({type: 'ERROR', payload: {error: data.message}});
        }
    } catch (error) {
        dispatch({type: 'ERROR', payload: {error: error.message}});
    }
}

//function OKMessage to /api/users/okmessage

export const okMessage = async function (token, dispatch) {
    dispatch({type: 'LOADING'});
    try {
        const response = await fetch('/api/users/okmessage', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            }
        });
        const data = await response.json(); 
        if (response.status === 200) {
            dispatch({type: 'UPDATE_DETAILS', payload: {user: data.user}});
            return true;
        } else {

            dispatch({type: 'ERROR', payload: {error: data.message}});
        }
    } catch (error) {
        dispatch({type: 'ERROR', payload: {error: error.message}});
    }
}



export const createAddress = async (userId, newAddress, dispatch) => {
  try {
    const response = await axios.post(`/api/users/${userId}/addresses`, newAddress);
    const { address } = response.data;
    dispatch({ type: 'ADD_ADDRESS', payload: address });
    return address;
  } catch (error) {
    throw error;
  }
};

export const transaction = async (userId) => {
    try {
      const response = await axios.get(`/api/user/${userId}/transactions`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  };