import Vue from 'vue'
import Router from 'vue-router'
//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)
const foo = () => import  ( '../components/user.vue') 
//路由懒加载，import（es6）引入的模块打包后成一个独立文件，只有当路由需要时再加载相应的组件，避免一次性加载完全部组件；require会打包成一个文件，没有独立文件
export default new Router({
    mode: 'history',
    routes:[
        {
            path:'/main',
            component: () => import('../components/main.vue'),
            children:[
                {   
                    path:'topic',
                    component: () =>import( '../components/topic.vue')
                }
            ],
            redirect:'/main/topic'
        },
        {
            path:'/user/:loginname',
            component:foo,
            props:true
        },
        {
            path:'/article/:id',
            component: () =>  import( '../components/Article.vue'),
            props:true
        },
        {
            path: "/",// 当访问首页时，重定向跳转到login界面
            redirect: {
                path:"/main"
            }
        },
        {
            path: "*",// 当访问首页时，重定向跳转到login界面
           component:()=>import('../components/notfound.vue')
        }
    ]
})