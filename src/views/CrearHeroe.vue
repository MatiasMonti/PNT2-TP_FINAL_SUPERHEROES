<template>
    <div>
        <h1 class="dark-text">Crear nuevo héroe</h1>
        <form @submit.prevent="crearHeroe">
            <label>
                <p class="dark-text">Nombre</p>
                <input v-model="nuevoHeroe.nombre" type="text" required />
            </label>
            <label>
                <p class="dark-text">Poder</p>
                <input v-model="nuevoHeroe.poder" type="text" required />
            </label>
            <label>
                <p class="dark-text">URL de Imagen</p>
                <input v-model="nuevoHeroe.imagenUrl" type="url" required />
            </label>
            <button type="submit">Crear Héroe</button>
        </form>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useHeroApiStore } from '../stores/heroApiStore'; // Importa el store

export default defineComponent({
    data() {
        return {
            nuevoHeroe: {
                nombre: '',
                poder: '',
                imagenUrl: ''
            }
        };
    },
    methods: {
        async crearHeroe() {
            console.log("Creando heroe");
            try {
                const heroApiStore = useHeroApiStore(); // Obtén la instancia del store
                heroApiStore.addCustomHero({ // Llama a la acción del store para agregar el héroe
                    nombre: this.nuevoHeroe.nombre,
                    poder: this.nuevoHeroe.poder,
                    imagenUrl: this.nuevoHeroe.imagenUrl
                });
                alert('Héroe creado exitosamente');
                console.log("Héroe creado:", this.nuevoHeroe);
                this.nuevoHeroe.nombre = '';
                this.nuevoHeroe.poder = '';
                this.nuevoHeroe.imagenUrl = '';
                // Redirige a donde corresponda después de crear el héroe
            } catch (error) {
                console.error('Error al crear el héroe:', error);
                alert('Hubo un error al crear el héroe.');
            }
        }
    }
});
</script>

<style scoped>
form label {
    display: block;
    margin-bottom: 10px;
}

form input {
    margin-left: 0px;
    width: 100%; /* Ajusta el ancho del input al 100% del contenedor */
    padding: 8px; /* Añade un padding para mejor apariencia y espaciado */
    box-sizing: border-box; /* Asegura que el padding no afecte el tamaño total */
}

form button {
    display: block;
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
}

form button:hover {
    background-color: #0056b3;
}
</style>
