import appConfig from '../../Helpers/appConfig'

const UserService = (id) => {
    const requestOptions = {
        method: 'GET',
        headers: appConfig.headers,
    };

    return fetch(appConfig.baseUrl + 'users/' + id, requestOptions)
        .then(response => response.json())
        .catch(error => {
            console.error('There was an error!', error);
        });
}

const UpdateUserService = (value) => {
    id = value._id
    const requestOptions = {
        method: 'PUT',
        headers: appConfig.headers,
        body: JSON.stringify(value)
    };

    return fetch(appConfig.baseUrl + 'members/' + id, requestOptions)
        .then(response => response.json())
        .catch(error => {
            console.error('There was an error!', error);
        });
}


const staffService = () => {
    const body =
    {
        "search": [{
            "searchfield": "status",
            "searchvalue": "active",
            "criteria": "eq",
            "datatype": "text"
        },
        ]
    }
    const requestOptions = {
        method: 'POST',
        headers: appConfig.headers,
        body: JSON.stringify(body)
    };

    return fetch(appConfig.baseUrl + 'users/filter', requestOptions)
        .then(response => response.json())
        .catch(error => {
            console.error('There was an error!', error);
        });
}



export { UserService, UpdateUserService, staffService, };