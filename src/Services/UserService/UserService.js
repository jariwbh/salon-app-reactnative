import Axios from '../../Helpers/appConfig'

const UserService = (id) => {
    return Axios.get('users/' + id);
}

const UpdateUserService = (value) => {
    let id = value._id
    const body = JSON.stringify(value);
    return Axios.put('members/' + id, body);
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
    return Axios.post('users/filter', body);
}

export { UserService, UpdateUserService, staffService, };