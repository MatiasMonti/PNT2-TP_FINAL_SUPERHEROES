<template>
    <div>
        <h1 class="dark-text">Busca Nuevos heroes!</h1>
        <input type="text" v-model="filter" @keyup.enter="fetchHeroes" placeholder="Buscar..." />
        <div class="Hero-list">
            <FoundHero v-for="hero in FoundHeroes" :key="hero.id" :hero="hero" />
        </div>
    </div>
</template>

<script>

import { useHeroApiStore } from '../stores/heroApiStore';
import { useHeroStore } from '../stores/heroStore';
import FoundHero from '../components/SearchHero.vue';

export default {
    components: {
        FoundHero
    },
    data(){
        return {
            filter: '',
            heroStore: useHeroStore(),
            heroApiStore: useHeroApiStore()
        }
    },
    computed: {
        FoundHeroes(){
            return this.heroApiStore.heroes;
        }
    },
    methods: {
        fetchHeroes(){
            this.heroApiStore.fetchHeroes(this.filter);
        }
    },
    mounted(){
        //fetchHeroes(); revisar si vale la pena trae heroes default.
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
.dark-text {
  color: #000000;
}
</style>

