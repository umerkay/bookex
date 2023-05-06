import axios from 'axios';

export const login = async function (formData, dispatch, callback) {

    dispatch({type: 'LOADING'});
    try {
        const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (response.status === 200) {
            dispatch({type: 'LOGIN', payload: {user: { email: data.email, name: data.name }, token: data.token}});
            callback();
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
        const response = await fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (response.status === 201) {
            dispatch({type: 'REGISTER', payload: {token: data.token}});
        } else {
            dispatch({type: 'ERROR', payload: {error: data.message}});
        }
    } catch (error) {
        dispatch({type: 'ERROR', payload: {error: error.message}});
    }

    // dispatch({type: 'REGISTER', payload: {user: formData.email, token: "token"}})

}

export const logout = async function (dispatch) {
    fetch('http://localhost:5000/api/users/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    dispatch({type: 'LOGOUT'})
}


export const updateUser = async (userId, updates, dispatch) => {
  try {
    const res = await axios.patch(`/api/users/${userId}`, updates);
    dispatch({ type: 'UPDATE_USER', payload: res.data });
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to update user');
  }
};
