import appConfig from '../../Helpers/appConfig'

const CategoryService = () => {
    const body =
    {
        "search": [{
            "searchfield": "formid",
            "searchvalue": "5e426741d466f1115c2e7d50",
            "criteria": "eq",
            "datatype": "ObjectId"
        },
        { "searchfield": "addedby", "searchvalue": "5ff6957fb638dd6a777f049c", "criteria": "eq" },
        { "searchfield": "status", "searchvalue": "active", "criteria": "eq" }
        ]
    }

    const requestOptions = {
        method: 'POST',
        headers: appConfig.headers,
        body: JSON.stringify(body)
    };

    return fetch(appConfig.baseUrl + 'formdatas/filter', requestOptions)
        .then(response => response.json())
        .catch(error => {
            console.error('There was an error!', error);
        });
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
    const requestOptions = {
        method: 'POST',
        headers: appConfig.headers,
        body: JSON.stringify(body)
    };

    return fetch(appConfig.baseUrl + 'services/filter', requestOptions)
        .then(response => response.json()).catch(error => {
            console.error('There was an error!', error);
        });
}


export { CategoryService, AppointmentListService };