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
    //reidrect to home
    
}


export const updateUser = async (userId, updates, dispatch) => {
  try {
    const res = await axios.patch(`/api/users/${userId}`, updates);
    dispatch({ type: 'UPDATE_USER', payload: res.data });
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to update user');
  }
};

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