<template>
    <div>
      <HeroBio :hero="Hero"/>
    </div>
  </template>

<script>
    import { useHeroApiStore } from '../stores/heroApiStore';
    import HeroBio from '../components/HeroBiography.vue'

    export default {
        components: {
            HeroBio
        },
        data(){
            return {
                heroApiStore: useHeroApiStore(),
            }
        },
        computed: {
            Hero(){

                this.fetchHeroeBiography(); 
                //yo tenia entendido que este deberia hacerlo el mounted pero si no agrego esta linea me cancela porque nunca hace el fetch

                const hero = this.heroApiStore.heroBiography;

                return hero;
            }
        },
        methods: {
            async fetchHeroeBiography(){
                const idHero = this.$route.params.id;

                await this.heroApiStore.fetchHeroeBiography(idHero)
            }
        },
        mounted(){
            this.fetchHeroeBiography();
        }
    }
</script>

<style>
    .dark-text {
    color: #000000;
    }
</style>