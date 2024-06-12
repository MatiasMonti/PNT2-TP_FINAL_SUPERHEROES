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

                const data = await response.json();

                
                const filteredResults = data.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()));
              
                
                return filteredResults.slice(0,10).map(item => ({
                  id: item.id,
                  name: item.name,
                  powerstats: item.powerstats,
                  image: item.images[0]
                }))
            } catch (error) {
                console.error('El error es: ', error)
            }
        },   
    },
})