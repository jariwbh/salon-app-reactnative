import appConfig from '../../Helpers/appConfig'

const BookService = (data) => {
    const body = JSON.stringify(data)
    const requestOptions = {
        method: 'POST',
        headers: appConfig.headers,
        body: body
    };
    return fetch(appConfig.baseUrl + 'appointments', requestOptions)
        .then(response => response.json())
        .catch(error => {
            console.error('There was an error!', error);
        });
}

export { BookService };