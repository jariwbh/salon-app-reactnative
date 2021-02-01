import appConfig from '../../Helpers/appConfig'

const BookHistoryService = (id) => {
    const body =
    {
        "search": [{ "searchfield": "attendee", "searchvalue": id, "criteria": "eq", "datatype": "ObjectID" }]
    }

    const requestOptions = {
        method: 'POST',
        headers: appConfig.headers,
        body: JSON.stringify(body)
    };

    return fetch(appConfig.baseUrl + 'appointments/filter', requestOptions)
        .then(response => response.json()).catch(error => {
            console.error('There was an error!', error);
        });
}

export { BookHistoryService };