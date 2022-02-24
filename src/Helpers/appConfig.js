import Axios from 'axios';

const appConfig = Axios.create({
    baseURL: 'http://qa.membroz.com//api/',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default appConfig;

//baseURL: 'http://103.102.46.32/api/',

// baseURL: 'https://app.membroz.com/api/',

// baseURL: 'http://cocoonmedicalspa.membroz.com/api/',

// baseURL: 'http://jeskir.membroz.com/api/',
