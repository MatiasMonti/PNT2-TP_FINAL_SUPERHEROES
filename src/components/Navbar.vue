<template>
    <nav class="navbar">
      <div class="nav-container">
        <a class="navbar-brand" href="#">PNT2</a>
        <ul class="nav-list">
          <li class="nav-item" v-if="isAuthenticated">
            <router-link class="nav-link" to="/home">Home</router-link>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <router-link class="nav-link" to="/favorites">Favoritos</router-link>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <router-link class="nav-link" to="/battle">Batalla</router-link>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
          <router-link class="nav-link" to="/battle-history">Crónicas</router-link>
          </li>
          <li class="nav-item" v-if="isAdmin">
            <router-link class="nav-link" to="/crearHeroe">Crear Heroe</router-link>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <router-link class="nav-link" to="/perfil">Perfil</router-link>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <button @click="logout" class="nav-link logout-button">Logout</button>
          </li>
          <li class="nav-item" v-else>
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <span>Monedas: {{ quantCoints }}</span>
          </li>
        </ul>
      </div>  
    </nav>
  </template>
  
  <script>
  import { useAuthStore } from '../stores/authStore';
  
  
  export default {
    computed: {
      isAuthenticated(){
        const authStore = useAuthStore();
        return authStore.isAuthenticated
      },
      isAdmin(){
        const authStore = useAuthStore();
        return authStore.isAdmin;
      },
      quantCoints(){
        const authStore = useAuthStore();
        return authStore.quantCoints;
      }
    },
    methods:{
      logout(){
        const authStore = useAuthStore();
        authStore.logout();
        this.$router.push({ name: 'Login'})
      }
    },
    mounted(){
      const authStore = useAuthStore();
      authStore.checkAuth();
    }
  }
  </script>
  
  <style scoped>
  .navbar {
    background-color: #333;
    color: white;
    padding: 1rem 1.5rem;
    width: 100%;
  }
  
  .nav-container {
    max-width: 1200px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .nav-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
  }
  
  .nav-item {
    margin-left: 1rem;
  }
  
  .nav-link {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
  }
  
  .nav-link:hover {
    background-color: #555;
  }
  
  .navbar-brand {
    font-weight: bold;
    color: white;
    text-decoration: none;
    font-size: 1.5rem;
  }
  
  .logout-button {
    background: none;
    border: none;
    cursor: pointer;
  }
  </style>
  