import Axios from '../../Helpers/appConfig';

export const getPackageService = (id) => {
    const body = {
        "search": [
            { "searchfield": "status", "searchvalue": "active", "datatype": "text", "criteria": "eq" },
            { "searchfield": "property.type", "searchvalue": "package", "datatype": "text", "criteria": "eq" },
            // { "searchfield": "branchid", "searchvalue": id, "datatype": "ObjectId", "criteria": "eq" },
            // { "searchfield": "property.availablebooking", "searchvalue": "Yes", "criteria": "eq", "datatype": "text" }
        ], "formname": "package"
    }
    return Axios.post('memberships/filter', body);
}