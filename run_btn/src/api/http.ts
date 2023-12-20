import service from "./api"


// 注册
export function login(data: { iphone: string, pwd: string }): Promise<any> {
    return service({
        url: "index.php/index/Yimi/addYimiuser",
        method: "POST",
        data: data
    })
}
// 登录
export function logon(data: { iphone: string, pwd: string }): Promise<any> {
    return service({
        url: "index.php/index/Yimi/webLogin",
        method: "POST",
        data: data
    })
}