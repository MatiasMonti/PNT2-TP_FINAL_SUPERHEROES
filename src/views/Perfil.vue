<template>
    <div>
        <h1 class="dark-text">Mi Perfil</h1>
        
        <div v-if="user">
      <!-- Mostrar el rol del usuario -->
      <p class="dark-text">
        <strong>Rol:</strong>
        <span v-if="isAdmin">Administrador</span>
        <span v-else>Usuario</span>
      </p>
    </div>
        <div class="button-container">
            <button @click="irAFavoritos">Ir a Favoritos</button>
            <button @click="irALogin" class="logout-button">Cerrar sesión</button>
        </div>
        <div class="spacer"></div>
        <hr />
        <h1 class="dark-text">Editar perfil</h1>
        
        <form @submit.prevent="guardarCambios">
            <label>
                <p class="dark-text">Nombre</p>
                <input v-model="user.name" type="text" />
            </label>
            <label>
                <p class="dark-text">Email</p>
                <input v-model="user.email" type="email" />
            </label>
            <button type="submit">Guardar Cambios</button>
        </form>
        <div class="spacer"></div>
        <hr />
        <h1 class="dark-text">Tu primer heroe favorito</h1>
        <div v-if="firstAddedHero" class="dark-text">
        <strong>Primer héroe agregado:</strong> {{ firstAddedHero.name }}
      </div>
      <div v-else class="dark-text">
        <strong>No has agregado ningún héroe a favoritos aún.</strong>
      </div>
      <div v-if="isAdmin">
            <div class="spacer"></div>
            <hr />
            <h1 class="dark-text">Creacion Heroe</h1>
            <button @click="irACrearHeroe">Crear Héroe</button>
        </div>

    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useHeroStore } from '../stores/heroStore';

export default defineComponent({
    data() {
        return {
            user: null,
            isAdmin: false
        };
    },
    computed: {
    firstAddedHero() {
      return useHeroStore().firstAddedHero;
    },
  },
    methods: {
        irALogin() {
            
            useAuthStore().logout();
           
            this.$router.push({ name: 'Login' });
        },
        irAFavoritos() {
            
            this.$router.push({ name: 'Favorites' });
        },
        async guardarCambios() {
            try {
                const authStore = useAuthStore();
                await authStore.updateUser(this.user);
                alert('Cambios guardados exitosamente');
            } catch (error) {
                console.error('Error al guardar los cambios:', error);
                alert('Hubo un error al guardar los cambios.');
            }
        },
        irACrearHeroe() {
            this.$router.push({ name: 'CrearHeroe' });
        }

    },
    created() {
        // Obtener datos del store al crear el componente
        const authStore = useAuthStore();
        this.user = authStore.user;
        this.isAdmin = authStore.isAdmin;
        //
        const heroStore = useHeroStore();
        heroStore.fetchHeroes(this.user.id); // Asumiendo que `user.id` es el ID del usuario actual
    
    }
});
</script>


<style scoped>
.button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.logout-button {
    margin-left: auto; /* Mueve el botón de cerrar sesión a la derecha */
}

.spacer {
    margin-top: 25px; /* Ajusta este valor para cambiar la cantidad de espacio */
}
form label {
    display: block;
    margin-bottom: 10px;
   
}
/* 
form input {
    margin-left: 0px;
    
} */
form input {
    margin-left: 0px;
    width: 50%; /* Ajusta el ancho del input al 100% del contenedor */
    padding: 8px; /* Añade un padding para mejor apariencia y espaciado */
    box-sizing: border-box; /* Asegura que el padding no afecte el tamaño total */
}
</style>
