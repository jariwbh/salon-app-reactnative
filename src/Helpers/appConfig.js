import Axios from 'axios';

const appConfig = Axios.create({
    baseURL: 'https://app.membroz.com/api/',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default appConfig;