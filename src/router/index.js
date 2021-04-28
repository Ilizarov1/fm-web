import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../components/Main/index.vue'
import Player from '../views/Players/Player'
import PlayerList from '../views/Players/List'
import Employees from '../views/Employees/index'
import Competition from '@/views/Schedule/Competition'
import Training from '@/views/Schedule/Training'
import Scout from '@/views/Scout/index'
import ScoutRepo from '@/views/Scout/Repo'
import Medi from '@/views/Medi/index'
import Tactics from '@/views/Tactics/index'
import Anime from '@/views/Tactics/Anime'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/index',
    component: Main,
    children: [
      { path: '/player', component: Player },
      { path: '/playerList', component: PlayerList },
      { path: '/employees', component: Employees },
      { path: '/competition', component: Competition },
      { path: '/training', component: Training },
      { path: '/scout', component: Scout },
      { path: '/scoutRepo', component: ScoutRepo },
      { path: '/medi', component: Medi },
      { path: '/tactics', component: Tactics },
      { path: '/anime', component: Anime }
    ]
  },
  {
    path: '/',
    redirect: 'login'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  //  to将要访问的路径
  //  from来源路径
  //  next表示放行

  // const tokenStr = window.sessionStorage.getItem('token')

  next()
})

export default router
