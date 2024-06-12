import { defineStore } from 'pinia';
import axios from 'axios';

export const useHeroApiStore = defineStore('heroApiStore', {
    state: () => ({
        heroes: [],
    }),
    getters: {
  
    },
    actions: {
        async fetchHeroes(filter){
            try {                
                const response = await axios.get('https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json');

                const data = response.data;
                
                this.heroes = data.filter(hero => hero.name.toLowerCase().includes(filter.toLowerCase()));              
                
                this.heroes = this.heroes.slice(0,10).map(hero => ({
                  id: hero.id,
                  name: hero.name,
                  powerstats: hero.powerstats,
                  image: hero.images.xs
                }))
            } catch (error) {
                console.error('El error es: ', error)
            }
        },   
    },
})