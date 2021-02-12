import Axios from '../../Helpers/appConfig'

const BookService = (data) => {
    const body = JSON.stringify(data)
    return Axios.post('appointments', body);
}

export { BookService };