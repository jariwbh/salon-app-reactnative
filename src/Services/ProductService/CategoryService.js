import Axios from '../../Helpers/appConfig'

export const CategoryService = () => {
    const body = {
        "search":
            [{
                "searchfield": "formid",
                "searchvalue": "5e058897b0c5fb2b6c15cc69",
                "criteria": "eq",
                "datatype": "ObjectId"
            }]
    }
    return Axios.post('formdatas/filter', body);
}