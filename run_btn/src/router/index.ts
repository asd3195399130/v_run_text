import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },{
    path:"/",
    name:"logon",
    component: () => import('../views/logonView.vue')
  },{
    path:"/Page",
    name:"Page",
    component:()=> import('../views/pagetable/PageView.vue'),
    redirect:"/Page/source",
    children:[
      {
         path:"/Page/order",
         name:"order",
         component:()=>import("../views/order/orderView.vue"),
      },
      {
        path:"/Page/serve",
        name:"serve",
        component:()=> import("../views/order/serveView.vue"),
      },{
        path:"/Page/source",
        name:"source",
        component:()=> import("../views/order/sourceView.vue")
      }

    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'
router.beforeEach((to,form,next) => {
  if(to.path === "/" || to.path === "/home"){
     next()
  } else if(localStorage.getItem("data")){
    next()
  }else{
    ElMessageBox.alert("请先登录", "提示", {
      confirmButtonText: '确定',
      callback: (action: Action) => {
        ElMessage({
          type: 'info',
          message: `action: ${action}`,
        })
        next("/")
      },
      
    })
  }
})
export default router
