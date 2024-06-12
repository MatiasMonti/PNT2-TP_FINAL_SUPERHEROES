<template >
    <div class="fav-hero">
        <img :src="hero.urlImage" :alt="hero.title" class="fav-hero-image"/>
        <div class="fav-hero-info">
            <h3>{{hero.name}}</h3>
        </div>
        <button @click="remove" class="remove-button">X</button>
    </div>
</template>
<script>

import { useHeroStore } from '../stores/heroStore';

export default {
    props: {
        hero: Object
    },
    methods:{
        async remove(){
            const heroStore = useHeroStore()

            const heroId = Number(this.hero.id);

            await heroStore.deleteSavedHero(heroId)
        }
    }
}
</script>
<style >
    .fav-hero{
        display: flex;
        align-items: center;
        margin-bottom: 1rem
    }

    .fav-hero-image{
        width: 50px;
        height: 50px;
        margin-bottom: 1rem
    }

    .fav-hero-info {
        flex-grow: 1
    }

    .remove-button {
        background-color: #ff6b6b;
        color: white;
        border: none;
        padding: 0.5rem;
        border-radius: 4px;
        cursor: pointer
    }

    .remove-button:hover {
        background-color: '#ff4c4c';
    }
    
</style>