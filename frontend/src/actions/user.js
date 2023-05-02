export const login = function (formData, dispatch) {

    dispatch({type: 'LOADING'})
    /*fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    }).then(res => res.json())
    .then(data => {
        if(data.success) {
            dispatch({type: 'LOGIN', payload: data})
        } else {
            dispatch({type: 'ERROR', payload: {error: data.error}})
        }
    })
    .catch(err => {
        dispatch({type: 'ERROR', payload: {error: err}})
    }) */

    dispatch({type: 'LOGIN', payload: {user: formData.email, token: "token"}})

}

export const logout = function (dispatch) {
    dispatch({type: 'LOGOUT'})
}