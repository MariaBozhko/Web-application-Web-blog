import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index.js'
import { Form, Field, ErrorMessage} from 'vee-validate'

import { createRouter, createWebHistory } from 'vue-router'
import About from './components/About.vue'
import Login from './components/Login.vue'
import Signup from './components/Signup.vue'
import Contact from './components/Contact.vue'
import Blog from './components/Blog.vue'
import Dashboard from './components/Dashboard.vue'
import Addpost from './components/DashboardPages/Addpost.vue'
import Managepost from './components/DashboardPages/Managepost.vue'
import Admin from './components/Admin.vue'
import Addcategory from './components/AdminPages/Addcategory.vue'
import Adduser from './components/AdminPages/Adduser.vue'
import Managecategories from './components/AdminPages/Managecategories.vue'
import Managepostadmin from './components/AdminPages/Managepostadmin.vue'
import Manageusers from './components/AdminPages/Manageusers.vue'
import Edit from './components/Edit.vue'
import Edituser from './components/AdminPages/Edituser.vue'
import Editcategory from './components/AdminPages/Editcategory.vue';

const router = createRouter({
  routes: [
    { name:'Login', path: '/login', component: Login },
    { name:'About', path: '/about', component: About },
    { name:'Signup', path: '/signup', component: Signup },
    { name:'Contact', path: '/contact', component: Contact },
    { name:'Blog', path: '/', component: Blog },
    { name:'Edit', path: '/edit', component: Edit },
    { name:'Dashboard', path: '/dashboard', component: Dashboard,
      children: [
      { name: 'Addpost', path: '/addpost', component: Addpost },
      { name: 'Managepost', path: '/managepost', component:  Managepost },
      ]
    },
    { name:'Admin', path: '/admin', component: Admin,
      children: [
      { name: 'Addcategory', path: '/addcategory', component: Addcategory },
      { name: 'Adduser', path: '/adduser', component:  Adduser },
      { name: 'Managecategories', path: '/managecategories', component: Managecategories },
      { name: 'Managepostadmin', path: '/managepostadmin', component:  Managepostadmin },
      { name: 'Manageusers', path: '/manageusers', component: Manageusers },
      { name: 'Edituser', path: '/edituser', component: Edituser },
      { name: 'Editcategory', path: '/editcategory', component: Editcategory },
      ]
    },
  ],
history: createWebHistory()
})

createApp(App)
.use(router)
.component('ErrorMessage', ErrorMessage)
.component('Form', Form)
.component('Field', Field)
.use(store)
.mount('#app')
