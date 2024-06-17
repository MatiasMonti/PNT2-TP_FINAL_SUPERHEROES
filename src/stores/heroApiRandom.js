import { defineStore } from 'pinia';
import axios from 'axios';

export const useHeroApiRandom = defineStore('heroApiRandom', {
    state: () => ({
        heroes: [],
    }),
    getters: {
  
    },
    actions: {
        async fetchHeroes(){
            try {                
                const response = await axios.get('https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json');
    
                const data = response.data;
                
                this.heroes = data.map(hero => ({
                    id: hero.id,
                    name: hero.name,
                    powerstats: hero.powerstats,
                    image: hero.images.xs,
                    // Se suma los  stats y se usa totalPower como atributo distinto a power para evitar algun problema
                    totalPower: Object.values(hero.powerstats).reduce((total, stat) => total + stat, 0)
                  }))
            } catch (error) {
                console.error('El error es: ', error)
            }
        },   
    },
})
