import axios from 'axios';

// export const login = async function (formData, dispatch, callback) {
//     dispatch({type: 'LOADING'});
//     try {
//         const response = await fetch('http://localhost:5000/api/users/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(formData)
//         });
//         const data = await response.json();
//         if (response.status === 200) {
//             const token = data.token;
//             // Store the token in the browser's local storage
//             localStorage.setItem('authToken', token);
//             // Pass the token in the Authorization header of subsequent requests
//             const authHeader = { 'Authorization': token };
//             const response = await fetch('http://localhost:5000/api/yourEndpoint', {
//                 method: 'GET',
//                 headers: authHeader
//             });
//             const data = await response.json();
//             dispatch({type: 'LOGIN', payload: {user: { email: data.email, name: data.name }, token: data.token}});
//             callback();
//         } else {
//             dispatch({type: 'ERROR', payload: {error: data.message}});
//         }
//     } catch (error) {
//         dispatch({type: 'ERROR', payload: {error: error.message}});
//     }
// }

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
            dispatch({type: 'LOGIN', payload: {user: data.user, token: data.token}});
            callback();
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

        const response = await fetch('http://localhost:5000/api/users/user', {
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