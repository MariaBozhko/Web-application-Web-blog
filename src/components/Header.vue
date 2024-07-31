<script>
import img1 from "@/assets/avatar1.jpg";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  data() {
    return {
      img1: img1,
    };
  },
  setup() {
    const show = ref(false);
    const router = useRouter();
    const user = computed(() => store.state.globalState.user);
    const toggleProfileMenu = () => (show.value = !show.value);
    const store = useStore();
    const isAuthenticated = computed(() => store.state.globalState.isAuthenticated);
    const logout = () => {
      store.commit('updateT', '');
      store.commit('setAuthState', false);
      router.push('/');
    };

    return {
      show,
      toggleProfileMenu,
      isAuthenticated,
      user,
      logout
    };
  },
};
</script>

<template>
  <header>
    <nav>
      <div class="container nav_container">
        <router-link :to="{ name: 'Blog' }" class="nav_logo">UNITPRESS 💻🌐</router-link>
        <ul class="nav_items">
          <li><router-link :to="{ name: 'Blog' }">Blog</router-link></li>
          <li><router-link :to="{ name: 'About' }">About</router-link></li>
          <li><router-link :to="{ name: 'Contact' }">Contact</router-link></li>
          <li>
            <div class="nav_profile" @click="toggleProfileMenu" v-if="isAuthenticated">
              Profile
            </div>
            <router-link :to="{ name: 'Login' }" v-if="!isAuthenticated">Log In</router-link>
            <div v-show="show" v-if="isAuthenticated" class="dropdown_menu">
              <router-link v-if='!user' :to="{ name: 'Managepost' }">Dashboard</router-link>
              <router-link v-if='user' :to="{ name: 'Managepostadmin' }">Dashboard</router-link>
              <router-link :to="'/'" @click.native="logout">Logout</router-link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<style scoped>
a.router-link-active {
  color: #0f0f3e;
  font-weight: 600;
}

nav {
  background: #6f6af8;
  width: 100vw;
  height: 4.5rem;
  position: fixed;
  top: 0;
  z-index: 10;
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.2);
}

.nav_logo {
  font-weight: 600;
  font-size: 1.2rem;
  color: white;
}

.nav_container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav_items {
  display: flex;
  align-items: center;
  gap: 4rem;
}

.nav_items li {
  position: relative;
}

.nav_profile {
  cursor: pointer;
  color: white;
}

.dropdown_menu {
  position: absolute;
  top: 3.5rem; /* Позиционирование под шапкой */
  right: 0;
  display: flex;
  flex-direction: column;
  background: #6f6af8;
  box-shadow: 0 3rem 3rem rgba(0, 0, 0, 0.4);
  padding: 1rem;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.3s ease-in-out;
}

.nav_profile:hover + .dropdown_menu,
.dropdown_menu:hover {
  visibility: visible;
  opacity: 1;
}

.dropdown_menu a {
  display: block;
  padding: 10px;
  color: white;
  text-decoration: none;
}

.dropdown_menu a.router-link-active {
  background: #da0f3f;
}

.logout{
  display: block;
  padding: 10px;
  color: white;
  text-decoration: none;
}

.logout:active
{
  background: #da0f3f;
}

</style>
