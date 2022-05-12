
let URL = {};

if(process.env.NODE_ENV === 'production') {
    URL = {
        baseURL: 'https://selling-page.herokuapp.com'
    }
} else {
    URL = {
        baseURL: 'http://localhost:8080'
    }
}

export default URL;