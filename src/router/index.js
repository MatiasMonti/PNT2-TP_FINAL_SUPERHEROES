import { createRouter, createWebHistory} from 'vue-router';
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Battle from '@/views/Battle.vue';
import NotFound from '../views/NotFound.vue'
import Favorites from '@/views/Favorites.vue';


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
        path: '/favorites',
        name: 'Favorites',
        component: Favorites,
        meta:{
            requiereAuth: true
        }
    },
    {
         path: '/battle',
         name: 'Battle',
        component: Battle,
        meta:{
            requiereAuth: true
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