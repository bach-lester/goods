import { createRouter, createWebHistory } from 'vue-router'
import loginPage from '@/views/login/loginPage.vue'
import AriticleChannel from '@/views/article/ArticleChannel.vue'
import AriticleManage from '@/views/article/ArticleManage.vue'
import UserAvatar from '@/views/user/UserAvatar.vue'
import UserPassword from '@/views/user/UserPassword.vue'
import UserProfile from '@/views/user/UserProfile.vue'
import LayoutContainer from '@/views/layout/LayoutContainer.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: loginPage },
    {
      path: '/',
      component: LayoutContainer,
      redirect: '/article/manage',
      children: [
        { path: '/article/manage', component: AriticleManage },
        { path: '/user/avatar', component: UserAvatar },
        { path: '/user/password', component: UserPassword },
        { path: '/user/profile', component: UserProfile },
        { path: '/article/channel', component: AriticleChannel },
      ],
    },
  ],
})

export default router
