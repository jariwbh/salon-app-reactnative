import Axios from 'axios';

const appConfig = Axios.create({
    baseURL: 'http://cocoonmedicalspa.membroz.com/api/',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default appConfig;

// baseURL: 'https://app.membroz.com/api/',

// baseURL: 'http://cocoonmedicalspa.membroz.com/api/',
