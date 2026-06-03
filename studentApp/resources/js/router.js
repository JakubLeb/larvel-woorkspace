import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        name: "home",
        path: "/",
        component: () => import("@/pages/Home.vue"),
    },
    {
        name: "register",
        path: "/register",
        meta: { guestOnly: true },
        component: () => import("@/pages/Register.vue"),
    },
    {
        name: "login",
        path: "/login",
        meta: { guestOnly: true },
        component: () => import("@/pages/Login.vue"),
    },
    {
        name: "dashboard",
        path: "/dashboard",
        meta: { requiresAuth: true },
        component: () => import("@/pages/Dashboard.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        component: () => import("@/pages/404.vue"),
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to, from) => {
    if (to.meta.requiresAuth && !isLogged()) {
        return {
            name: 'login',
            query: { redirect: to.fullPath },
        }
    }
    if (to.meta.guestOnly && isLogged()) {
        return { name: 'dashboard' }
    }
})

function isLogged() {
    return localStorage.getItem('isLogged') === 'true'
}

export default router
