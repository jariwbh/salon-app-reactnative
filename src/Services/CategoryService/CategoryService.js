import Axios from '../../Helpers/appConfig';

const CategoryService = (id) => {
    const body =
    {
        "search": [{
            "searchfield": "formid",
            "searchvalue": "5e426741d466f1115c2e7d50",
            "criteria": "eq",
            "datatype": "ObjectId"
        },
        // { "searchfield": "branchid", "searchvalue": id, "criteria": "eq", "datatype": "ObjectId" },
        { "searchfield": "status", "searchvalue": "active", "criteria": "eq", "datatype": "text" }
        ], "formname": "treatment"
    }
    return Axios.post('formdatas/filter', body)
}

const AppointmentListService = (id) => {
    const body =
    {
        "search": [{
            "searchfield": "status",
            "searchvalue": "active",
            "criteria": "eq",
            "datatype": "text"
        },
            // { "searchfield": "branchid", "searchvalue": id, "criteria": "eq", "datatype": "ObjectId" }
        ], "size": 5
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
        {
            "searchfield": "status",
            "searchvalue": "active",
            "criteria": "eq"
        },
            // {
            //     "searchfield": "property.onlineavailibility",
            //     "searchvalue": true,
            //     "criteria": "eq",
            //     "datatype": "boolean"
            // }
        ], "formname": "service"
    }
    return Axios.post('services/filter', body)
}

export { CategoryService, AppointmentListService, CategoryByAppointmentService };