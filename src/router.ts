import {createRouter,createWebHashHistory} from 'vue-router'
import {defineComponent} from 'vue'

// V4.0 retains the existing application shell and page components.
// Route records describe navigation; App.vue adapts them to existing views.
const RouteMarker=defineComponent({render:()=>null})
export const pagePaths={
 home:'/home',courses:'/courses',stages:'/adventure',achievements:'/profile',
 lesson:'/lesson',cards:'/vocabulary',insights:'/analytics',speaking:'/speaking',
 lab:'/lab',studio:'/studio',reading:'/reading'
} as const
export const router=createRouter({
 history:createWebHashHistory(import.meta.env.BASE_URL),
 routes:[
  {path:'/',redirect:'/home'},
  ...Object.entries(pagePaths).map(([name,path])=>({name,path,component:RouteMarker})),
  ...['lesson','vocabulary','speaking','adventure','practice','review'].map(path=>({path:'/'+path+'/:unitId',component:RouteMarker})),
  {path:'/review/due/:unitId',component:RouteMarker},
  {path:'/adventure/:unitId/challenge/:stage(0|1|2)',component:RouteMarker},
  {path:'/reading/:bookId/:page?',component:RouteMarker},
  {path:'/practice',name:'practice',component:RouteMarker},
  {path:'/review',name:'review',component:RouteMarker},
  {path:'/review/due',name:'due',component:RouteMarker},
  {path:'/adventure/challenge/:stage(0|1|2)',name:'challenge',component:RouteMarker},
  {path:'/:pathMatch(.*)*',redirect:'/home'}
 ]
})
