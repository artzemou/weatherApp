import Vue from 'vue'
import Router from 'vue-router'
import WeatherApp from '@/components/WeatherApp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'WeatherApp',
      component: WeatherApp
    }
  ]
})
