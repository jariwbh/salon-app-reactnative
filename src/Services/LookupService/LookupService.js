import Axios from '../../Helpers/appConfig'

const getAllCountryService = () => {
    const body = {
        "search": [{
            "searchfield": "status",
            "searchvalue": "active",
            "criteria": "eq",
            "datatype": "text"
        }, {
            "searchfield": "lookup",
            "searchvalue": "country",
            "criteria": "eq",
            "datatype": "text"
        }]
    }
    return Axios.post('lookups/filter', body)
}

export { getAllCountryService };