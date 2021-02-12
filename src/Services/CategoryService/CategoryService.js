import Axios from '../../Helpers/appConfig'

const CategoryService = () => {
    const body =
    {
        "search": [{
            "searchfield": "formid",
            "searchvalue": "5e426741d466f1115c2e7d50",
            "criteria": "eq",
            "datatype": "ObjectId"
        },
        { "searchfield": "status", "searchvalue": "active", "criteria": "eq" }
        ], "formname": "poscategory"
    }
    return Axios.post('formdatas/filter', body)
}

const AppointmentListService = () => {
    const body =
    {
        "search": [{
            "searchfield": "status",
            "searchvalue": "active",
            "criteria": "eq",
            "datatype": "text"
        }, { "searchfield": "addedby", "searchvalue": "5ff6957fb638dd6a777f049c", "criteria": "eq" }]
    }
    return Axios.post('services/filter', body)
}

const CategoryByAppointmentService = (id) => {
    const body =
    {
        "search": [{
            "searchfield": "category",
            "searchvalue": id,
            "criteria": "eq",
            "datatype": "ObjectId"
        },
        { "searchfield": "status", "searchvalue": "active", "criteria": "eq" }]
    }
    return Axios.post('services/filter', body)
}

export { CategoryService, AppointmentListService, CategoryByAppointmentService };