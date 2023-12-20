import service from "./api"
// 渲染列表
export function addlist(data:any) {
    return service({
        url: "index.php/index/Yimi/getOrderList",
        method: "post",
        data: data
    })
}
// 添加列表
export function addentred(data: any) {
   return service({
       url:"index.php/index/Yimi/addOrder",
       method: "post",
       data: data
   })
}
// 查看详情列表
export function lookup(id:any){
    return service({
        url: "index.php/index/Yimi/getOrderbyid?id=" + id,
        method: "post",
    })

}

// 删除列表
export function dellist(id:any){
    return service({
        url:"index.php/index/Yimi/delOrder?id=" + id,
        method:"post",
    })
}
// 搜索
export function searched(data:any){
    return service({
        url:"index.php/index/Yimi/getOrderList",
        method:"post",
        data:data
    })
}
// 修改
export function revise(data:any){
    return service({
        url:"index.php/index/Yimi/addOrder",
        method:"POST",
        data:data
    })
}