import Axios from '../../Helpers/appConfig'

const ClassService = (date) => {
    const body = {
        "search": [
            {
                "searchfield": "appointmentdate",
                "searchvalue": date,
                "criteria": "fullday",
                "datatype": "Date"
            },
            {
                "searchfield": "onModel",
                "searchvalue": "Groupclass",
                "criteria": "eq",
                "datatype": "text"
            }
        ], "formname": "appointment"
    }
    return Axios.post('appointments/filter', body);
}

const GroupclasseService = (id, body) => {
    JSON.stringify(body);
    return Axios.patch('groupclasses/' + id, body);
}

export { ClassService, GroupclasseService };