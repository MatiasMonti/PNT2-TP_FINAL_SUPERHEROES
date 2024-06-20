import { defineStore } from 'pinia';
import axios from 'axios';

export const useHeroApiStore = defineStore('heroApiStore', {
    state: () => ({
        heroes: [],
        heroBiography: null,
        customHeroes: []
    }),
    actions: {
        async fetchHeroes(filter) {
            try {
                const response = await axios.get('https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json');
                const data = response.data;
                const joinListas = data.concat(this.customHeroes);

                console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                console.log(this.customHeroes);
                console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

                this.heroes = joinListas.filter(hero => hero.name.toLowerCase().includes(filter.toLowerCase()));
                
                this.heroes = this.heroes.slice(0, 10).map(hero => ({
                    id: hero.id,
                    name: hero.name,
                    powerstats: hero.powerstats,
                    image: hero.images?.xs || 'default-image-url' // Use a default image if xs is not available
                }));
            } catch (error) {
                console.error('El error es: ', error);
            }
        },
        async fetchHeroeBiography(id) {
            try {
                const response = await axios.get(`https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/${id}.json`);
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
                };
            } catch (error) {
                console.error('Error al obtener la biografía del héroe:', error);
            }
        },
        addCustomHero(hero) {
            console.log("####################################");
            const newId = this.customHeroes.length > 0
                ? this.customHeroes[this.customHeroes.length - 1].id + 1
                : 1;

            this.customHeroes.push({
                id: newId,
                name: hero.nombre,
                power: hero.poder,
                image: hero.imagenUrl
            });
            console.log('Custom Heroes:', this.customHeroes);
            console.log("####################################");
        }
    }
});
