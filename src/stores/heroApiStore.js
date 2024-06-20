import { defineStore } from 'pinia';
import axios from 'axios';

export const useHeroApiStore = defineStore('heroApiStore', {
    state: () => ({
        heroes: [],
        heroBiography : null,
        customHeroes : []
    }),
    getters: {
        // allHeroes(state) {
        //     return [...state.heroes, ...state.customHeroes];
        // }
    },
    actions: {
        async fetchHeroes(filter){
            try {                
                const response = await axios.get('https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json');

                const data = response.data;
                const joinListas = data.concat(this.customHeroes)
                console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                console.log(this.customHeroes);
                console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                this.heroes = joinListas.filter(hero => hero.name.toLowerCase().includes(filter.toLowerCase()));              
                
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
        async fetchHeroeBiography(id){
            try {                
                const response= await axios.get(`https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/${id}.json`);

                const data = response.data;     
                
                this.heroBiography = {
                  alias: data.biography.aliases.join(', '),
                  name: data.biography.fullName,
                  alterEgos: data.biography.alterEgos,
                  placeOfBirth: data.biography.placeOfBirth,
                  occupation: data.work.occupation,
                  firstAppearance: data.biography.firstAppearance,
                  gender: data.appearance.gender,
                  race: data.appearance.race,
                  publisher: data.biography.publisher,
                  image: data.images.lg
                }
            } catch (error) {
                console.error('El error es: ', error)
            }
        }, addCustomHero(hero) {
            console.log("####################################");
            // Generar ID único para el héroe personalizado
            const newId = this.customHeroes.length > 0
                ? this.customHeroes[this.customHeroes.length - 1].id + 1
                : 1; // Comienza desde 1 si no hay héroes personalizados

            this.customHeroes.push({
                id: newId,
                name: hero.nombre,
                power: hero.poder,
                image: hero.images.xs
            });
            console.log('Custom Heroes:', this.customHeroes);
            console.log("####################################");
        }
        
    },
})