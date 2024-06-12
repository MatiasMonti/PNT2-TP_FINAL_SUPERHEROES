<template>  
  <div class="found-hero">
    <img :src="hero.image" :alt="Image" class="fav-found-image"/>        
    <div class="found-hero-info">
      <h3 class="dark-text">{{hero.name}}</h3>
    </div>
    <button @click="addToFavorites(hero)">Añadir a favoritos</button>
  </div>
</template>
<script>

import { useHeroStore } from '../stores/heroStore';

export default {
    props: {
        hero: Object
    },
    methods:{
        async addHero(){
            const heroStore = useHeroStore()
            
            //modelar aca o en heroStore el heroe para que envie a la base el heroe con el formato  de campos esperado
            await heroStore.saveHero(this.hero)
        }
    }
}
</script>

<style > 
 .found-hero{
        display: flex;
        align-items: center;
        margin-bottom: 1rem
    }    

.found-hero-image{
    width: 50px;
    height: 50px;
    margin-bottom: 1rem
}

.found-hero-info {
    flex-grow: 1
}
.dark-text {
  color: #000000;
}
</style>