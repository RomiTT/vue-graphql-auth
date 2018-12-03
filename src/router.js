import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)

const router = new Router({
  routes: [{
        path: '/',
        name: 'home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "home" */ './views/Home.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import( /* webpackChunkName: "login" */ './views/Login.vue'),
      beforeEnter: (to, from, next) => {
        if (store.getters.isAppInitialized === false || store.getters.isLoggined === true) {
          return next("/")
        }
        next()
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/users',
      name: 'users',
      component: () => import( /* webpackChunkName: "users" */ './views/Users.vue'),
      meta: {
        requiresAuth: true
      },
      beforeEnter: (to, from, next) => {
        if (store.getters.user === null || store.getters.user.role !== "ADMIN_USER") {
          alert('Unauthorized access')
          return next(from.path)
        }
        next()
      }
    }
  ]
})


router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    next('/')
  }
  else if (to.matched.some(record => record.meta.requiresAuth) && store.getters.isLoggined === false) {
    return next('/login')
  }
  else {
    next()
  }
})


export default router;
