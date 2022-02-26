import Axios from '../../Helpers/appConfig';

export const BranchService = () => {
    const body =
    {
        "search": [{
            "searchfield": "status",
            "searchvalue": "active",
            "criteria": "eq",
            "datatype": "text"
        }] //, "size": 5
    }
    return Axios.post('branches/filter', body)
}