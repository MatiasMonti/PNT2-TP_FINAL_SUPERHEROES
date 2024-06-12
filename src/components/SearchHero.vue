<template>
    <div>
      <input type="text" v-model="filter" @input="searchHero" placeholder="Buscar..." />
      <ul>
        <li v-for="hero in results" :key="hero.id">
          <img :src="hero.image" alt="Image" />
          <p>Nombre: {{ hero.name }}</p>
          <button @click="addToFavorites(hero)">Añadir a favoritos</button>
        </li>
      </ul>
     
    </div>
  </template>
<script>

import { useHeroApiStore } from '../stores/heroApiStore';
import { useHeroStore } from '../stores/heroStore';

export default {
    props: {
        hero: Object
    },
    methods:{
        async addHero(){
            const heroStore = useHeroStore()

            await heroStore.saveHero(this.hero)
        },
        async searchHero(){
            const heroApiStore = useHeroApiStore()

            await heroApiStore.fetchHeroes(this.filter)
        }
    }
}
</script>

<style >
 
    
</style>