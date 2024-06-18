<template>
    <div>
        <h1 class="dark-text">Mi Perfil</h1>
        <div v-if="user">
            <p class="dark-text"><strong>Nombre:</strong> {{ user.name }}</p>
            <p class="dark-text"><strong>Email:</strong> {{ user.email }}</p>
            <p class="dark-text" v-if="isAdmin"><strong>Administrador</strong></p>
            <p class="dark-text" v-else><strong>Usuario</strong></p>
        </div>
        <button @click="irALogin">Cerrar sesión</button>
        <button @click="irAFavoritos">Ir a Favoritos</button>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useAuthStore } from '../stores/authStore';

export default defineComponent({
    data() {
        return {
            user: null,
            isAdmin: false
        };
    },
    methods: {
        irALogin() {
            
            useAuthStore().logout();
           
            this.$router.push({ name: 'Login' });
        },
        irAFavoritos() {
            
            this.$router.push({ name: 'Favorites' });
        }
    },
    created() {
        // Obtener datos del store al crear el componente
        const authStore = useAuthStore();
        this.user = authStore.user;
        this.isAdmin = authStore.isAdmin;
    }
});
</script>

<style scoped>

</style>
