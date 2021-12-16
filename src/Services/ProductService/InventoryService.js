import Axios from '../../Helpers/appConfig'

export const InventoryService = (id) => {
    let body
    if (id != null) {
        body =
        {
            "search":
                [
                    { "searchfield": "category", "searchvalue": id, "criteria": "eq", "datatype": "ObjectId" },
                    { "searchfield": "status", "searchvalue": "active", "criteria": "eq" }
                ]
        }
    }
    else {
        body =
        {
            "search":
                [{
                    "searchfield": "status",
                    "searchvalue": "active",
                    "criteria": "eq",
                    "datatype": "text"
                }]
        }
    }

    return Axios.post('billitems/filter', body);
}