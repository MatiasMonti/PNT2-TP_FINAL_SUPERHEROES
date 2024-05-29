import { createRouter, createWebHistory} from 'vue-router';
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

import NotFound from '../views/NotFound.vue'


const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
            requiereAuth: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            requiereAuth: false
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    console.log('EL TO', to);
    if(to.meta.requiereAuth && !isAuthenticated){
        next({name:'Login'})
    }
    else{
        next();
    }
 })

export default router