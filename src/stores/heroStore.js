import { defineStore } from 'pinia';
import axios from 'axios';

export const useHeroStore = defineStore('heroStore', {
    state: () => ({
        heroes: [],
        quantHeroes : 0
    }),
    getters: {
        quantHeroes: (state) => {
            return state.quantHeroes;
        },
        isInHeroes: (state) => (heroId) => {
            return !!state.heroes.find(item => item.id === heroId);
        }
    },
    actions: {
        async fetchHeroes(idUser){
            try {                
                const response = await axios.get(`https://6657cb085c3617052645dfd1.mockapi.io/savedHeroes?idUser=${idUser}`)

                this.heroes = response.data;

            } catch (error) {
                console.error('El error es: ', error)
            }
        },
        addHero(hero){
            if(this.heroes.some(h => h.id === hero.id)) {
                this.heroes.push(hero);
                cantHeroes = this.heroes.length();
            }
            localStorage.setCant('cantHeroes', this.cantHeroes)
        },
        deleteHero(idHero){             
            this.heroes = this.heroes.filter(hero => hero.id !== idHero.toString())

            localStorage.setCant('cantHeroes', this.cantHeroes)
            },
        async saveHero(newHero) {
            try {                
                const response = await axios.post('https://6657cb085c3617052645dfd1.mockapi.io/savedHeroes', newHero);
                
            } catch (error) {
                console.error('Error agregando heroe')
            }
        },
        async deleteSavedHero(idSavedHero) {
            try {                
                const response = await axios.delete(`https://6657cb085c3617052645dfd1.mockapi.io/savedHeroes/${idSavedHero}`);
                this.deleteHero(idSavedHero);
            } catch (error) {
                console.error('Error borrando heroe')
            }
        },            
    },
})