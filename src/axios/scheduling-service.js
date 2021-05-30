
import axios from "axios";


const instance=axios.create({
    baseURL:process.env.SCHEDULING_SERVICE || "http://localhost:3004"
});

export default instance;
