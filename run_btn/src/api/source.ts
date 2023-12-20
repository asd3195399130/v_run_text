import service from "./api";

// 渲染图片列表
export function getreading(){
    return service({
        url:"index.php/index/Yimi/getTuList",
        method:"post",
    })
}
// 添加素材列表

export function  getaddimages(data:any){
    return service({
        url: "index.php/index/Yimi/addTu",
        method: "POST",
        data: data
    })
}
// 素材删除
export function  getdelimage(id:any){
    return service({
        url:'index.php/index/Yimi/delTu?id='+id,
        method:'post',
    })
}
// 上传图片
export function getupload(data:any){
 return service({
     url:"index.php/index/upload/uploadimg",
     method:"post",
     data:data
 })
}