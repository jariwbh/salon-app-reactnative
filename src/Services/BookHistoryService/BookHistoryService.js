import Axios from '../../Helpers/appConfig'

const BookHistoryService = (id) => {
    const body = {
        "search": [{
            "searchfield": "attendee",
            "searchvalue": id,
            "criteria": "eq",
            "datatype": "ObjectId"
        }]
    }
    return Axios.post('appointments/filter', body)
}

export { BookHistoryService };