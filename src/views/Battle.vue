<template>
    <div>
        <h1>Batallas</h1>
        <div class="Hero-list">
            <Hero v-for="hero in Heroes" :key="hero.id" :hero="hero" />
        </div>
    </div>
</template>

<script>

import { useHeroStore } from '../stores/heroStore';
import { useAuthStore } from '../stores/authStore';
import Hero from '../components/FavoritesHeroes.vue';


export default {
    components: {
        Hero
    },
    data(){
        return {
            heroStore: useHeroStore(),
            authStore: useAuthStore()
        }
    },
    computed: {
        Heroes(){
            return this.heroStore.heroes
        }
    },
    methods: {
        fetchHeroes(){
            this.heroStore.fetchHeroes(this.authStore.id)
        }
    },
    mounted(idUser){
        this.fetchHeroes(idUser);
    }
    
}
</script>
<style scoped>
.Hero-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  padding: 16px;
}
</style>