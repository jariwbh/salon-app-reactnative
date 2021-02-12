import Axios from 'axios';
const appConfig = Axios.create({
    baseURL: 'http://app.membroz.com/api/',
    headers: {
        'Content-Type': 'application/json',
        'authkey': "5ff6957fb638dd6a777f049c"
    }
});

export default appConfig;