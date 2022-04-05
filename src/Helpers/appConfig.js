import Axios from 'axios';

const appConfig = Axios.create({
    baseURL: 'https://thejuicyeffect.membroz.com/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default appConfig;

// baseURL: 'https://thejuicyeffect.membroz.com/api',

// baseURL: 'http://103.102.46.32/api/',

// baseURL: 'https://app.membroz.com/api/',

// baseURL: 'http://cocoonmedicalspa.membroz.com/api/',

// baseURL: 'https://jeskir.membroz.com/api/',
