
import axios from "axios";


const instance=axios.create({
    baseURL: process.env.AUTH_SERVICE || "http://localhost:3001"
});

export default instance;
