import Vue from 'vue'
import VueRouter from 'vue-router'
import { isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser } from '@/auth/utils'
import { canNavigate } from '@/libs/acl/routeProtection'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/pages/Home.vue'),
      meta: {
        pageTitle: 'Home',
        resource: 'Auth',
        breadcrumb: [
          {
            text: 'Home',
            active: true,
          },
        ],
      },
    },
    {
      path: '/manual-generator',
      name: 'manual-generator',
      component: () => import('@/views/pages/Generator.vue'),
      meta: {
        pageTitle: 'Generador Manual',
        resource: 'Auth',
        breadcrumb: [
          {
            text: 'Generador Manual',
            active: true,
          },
        ],
      },
    },
    {
      path: '/login',
      name: 'auth-login',
      component: () => import('@/views/auth/Login.vue'),
      meta: {
        layout: 'full',
        resource: 'Auth',
        redirectIfLoggedIn: true,
      },
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        resource: 'Auth',
        layout: 'full',
      },
    },
    {
      path: '/not-authorized',
      name: 'misc-not-authorized',
      component: () => import('@/views/error/NotAuthorized.vue'),
      meta: {
        layout: 'full',
        resource: 'Auth',
      },
    },
    {
      path: '/forgot-password',
      name: 'auth-forgot-password-v2',
      component: () => import('@/views/auth/ForgotPassword-v2.vue'),
      meta: {
        layout: 'full',
        resource: 'Auth',
      },
    },
    {
      path: '/reset-password',
      name: 'auth-reset-password-v2',
      component: () => import('@/views/auth/ResetPassword-v2.vue'),
      meta: {
        layout: 'full',
        resource: 'Auth',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn()
  if (!canNavigate(to)) {
    // Redirect to login if not logged in
    
    if (!isLoggedIn) {
      return next({ name: 'auth-login' })
    }
    // If logged in => not authorized
    return next({ name: 'misc-not-authorized' })
  }

  if(to.path === '/forgot-password'){
    if(!isLoggedIn){
      return next()
    }
  }

  if(to.path === '/reset-password'){
    if(!isLoggedIn){
      return next()
    }
  }

  if(to.path !== '/login'){
    if(!isLoggedIn){
      return next({ name: 'auth-login'} )
    }
  }else{
    if(isLoggedIn){
      return next({ path: "/" })
    }
  }

  return next()
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
