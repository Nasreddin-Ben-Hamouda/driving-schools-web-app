
import axios from "axios";

//this instance created juste for only the login and register apis
const instance=axios.create({
    baseURL: process.env.REACT_APP_AUTH_SERVICE || "http://localhost:3001"
});

export default instance;
