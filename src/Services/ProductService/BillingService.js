import Axios from '../../Helpers/appConfig'

export const BillingService = (body) => {
    return Axios.post('bills', body);
}

export const BillingFilterService = (id) => {
    const body = {
        "search": [{
            "searchfield": "customerid",
            "searchvalue": id,
            "criteria": "eq",
            "datatype": "ObjectId"
        }]
    }
    return Axios.post('bills/filter', body);
}

export const SalesOrderFilterService = (id) => {
    const body = {
        "search": [{
            "searchfield": "customerid",
            "searchvalue": id,
            "criteria": "eq",
            "datatype": "ObjectId"
        }], "formname": "salesorder"
    }
    return Axios.post('salesorders/filter', body);
}

export const SalesOrderService = (body) => {
    return Axios.post('salesorders', body);
}
