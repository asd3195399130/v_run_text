import service from "./api"

// 渲染服务列表

export function playup(data:any){
    return service({
        url:"index.php/index/Yimi/getGoodsList",
        method:"post",
        data:data
    })
}
// 添加
export function getaddlist(data:any){
    return service({
        url:"index.php/index/Yimi/addGoods",
        method:"post",
        data:data
    })
}
// 查看
export function getchecked(id:any){
    return service({
        url:"index.php/index/Yimi/getGoodsbyid?id=" + id,
        method:"post"
    })
}
// 删除
export function delserve(id:any){
    return service({
        url:"index.php/index/Yimi/delGoods?id=" + id,
        method:"post",
    })
}
// 修改
export function getedit(data:any){
    return service({
        url:'index.php/index/Yimi/addGoods',
        method:"post",
        data:data
    })
}
// 搜索
export function getsecher(data:any){
    return service({
        url:"index.php/index/Yimi/getGoodsList",
        method:"post",
        data:data
    })
}