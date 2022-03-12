import Axios from '../../Helpers/appConfig';

export const BranchService = () => {
    const body =
    {
        "search": [{
            "searchfield": "status",
            "searchvalue": "active",
            "criteria": "eq",
            "datatype": "text"
        }
            , {
            "searchfield": "_id",
            "searchvalue": "615c46f7bfd7600bf0d36074",
            "criteria": "eq",
            "datatype": "objectId"
        }
        ] //, "size": 5
    }
    return Axios.post('branches/filter', body)
}