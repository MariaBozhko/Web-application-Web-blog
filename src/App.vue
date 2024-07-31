<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import About from './components/About.vue'
import Login from './components/Login.vue'
import Signup from './components/Signup.vue'
import Contact from './components/Contact.vue'
import Blog from './components/Blog.vue'
import Dashboard from './components/Dashboard.vue'
import Admin from './components/Admin.vue'
import Edit from './components/Edit.vue'

export default {
	components: {
    Header,
    Footer,
    About,
    Login,
    Signup,
    Contact,
    Blog,
    Dashboard,
    Admin,
    Edit,
  }
}
</script>

<template>
  <body>
    <Header />
    <router-view />
    <Footer />
  </body>
</template>


