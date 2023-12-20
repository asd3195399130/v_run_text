import axios from "axios";
const service = axios.create({
    baseURL: "https://testshool.zzgoodqc.cn/",
    timeout: 5000,

})

export default service