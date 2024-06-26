import { defineStore } from 'pinia';
import axios from 'axios';

export const useHeroStore = defineStore('heroStore', {
    state: () => ({
        heroes: [],
        quantHeroes : 0,
        adminHeroes : []
    }),
    getters: {
        quantHeroes: (state) => {
            return state.quantHeroes;
        },
        isInHeroes: (state) => (heroId) => {
            return !!state.heroes.find(item => item.id === heroId);
        },
        firstAddedHero: (state) => {
            return state.heroes.length > 0 ? state.heroes[0] : null;
        }
    },
    actions: {
        async fetchHeroes(idUser){
            try {                
                const response = await axios.get(`https://6657cb085c3617052645dfd1.mockapi.io/savedHeroes?idUser=${idUser}`);
                const favoritosFiltradosPorIdUser = response.data.filter(fav => fav.idUser === idUser);
                const data = favoritosFiltradosPorIdUser;
                const join = data.concat(this.adminHeroes);
                this.heroes = join

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
         async saveHero(hero) {
            const response = await axios.get(`https://6657cb085c3617052645dfd1.mockapi.io/savedHeroes`);
            const existingHeroesFiltradosPorIdUser = response.data.filter(fav => fav.idUser === hero.idUser);
            const heroExists = existingHeroesFiltradosPorIdUser.some(savedHero => savedHero.idHero === hero.id);

            if (heroExists) {
                window.alert(`${hero.name} ya existe en tu lista de favoritos.`);
                return; 
            }else{
                try {                
                    const newHero = {
                        "idHero": parseInt(hero.id),
                        "idUser": hero.idUser,
                        "name": hero.name,
                        "urlImage": hero.image,
                        "power": hero.powerstats.intelligence + hero.powerstats.strength + hero.powerstats.speed
                         + hero.powerstats.power + hero.powerstats.durability + hero.powerstats.combat
                    }
                    window.alert(`Se ha agregado a ${newHero.name}!`)
                    const response = await axios.post('https://6657cb085c3617052645dfd1.mockapi.io/savedHeroes', newHero);
                } catch (error) {
                    console.error('Error agregando heroe: ',error)
                }
            }  
        },
        async deleteSavedHero(hero) {            
            if(hero.id){
                try {                             
                    console.log(hero.id);       
                    const response = await axios.delete(`https://6657cb085c3617052645dfd1.mockapi.io/savedHeroes/${hero.id}`);
                    this.deleteHero(hero.id);
                } catch (error) {
                    console.error('Error borrando heroe')
                }
            }   
        },    
        agregarHeroeAdmin(hero)     {
            this.adminHeroes.push({
                name: hero.nombre,
                power: hero.poder,
                urlImage: hero.imagenUrl
            });
        }   
    },
})