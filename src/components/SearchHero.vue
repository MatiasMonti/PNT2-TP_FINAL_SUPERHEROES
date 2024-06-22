<template>  
  <div class="found-hero">
    <img :src="hero.image" :alt="hero.name" class="fav-found-image"/>        
    <div class="found-hero-info">
      <h3 class="dark-text">{{hero.name}}</h3>
    </div>
    <button @click="addToFavorites()">Añadir a favoritos</button>
  </div>
</template>
<script>

import { useAuthStore } from '../stores/authStore';
import { useHeroStore } from '../stores/heroStore';

export default {
    props: {
        hero: Object
    },
    methods:{
        async addToFavorites(){
            const heroStore = useHeroStore()
            const authStore = useAuthStore()
            this.hero.idUser = authStore.id
            // console.log(this.hero.idUser)
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