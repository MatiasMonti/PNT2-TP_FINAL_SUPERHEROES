<template>
  <div>
    <div v-if="hasHeroes">
      <label class="dark-text">Selecciona tu héroe favorito:</label>
      <select v-model="selected">
        <option disabled value="">Selecciona un héroe</option>
        <option v-for="hero in heroes" :key="hero.id" :value="hero">
          {{ hero.name }}
        </option>
      </select>
      <button @click="startBattle" :disabled="!selected">Comenzar Batalla</button>
    </div>
    <div v-else>
      <p>No tienes héroes favoritos, la batalla será entre dos héroes aleatorios.</p>
      <button @click="startBattle">Comenzar Batalla</button>
    </div>
    <div v-if="enemyHero">
      <h2 class="dark-text">Resultado de la Batalla</h2>
      <p class="dark-text" >Tu Héroe: {{ selected.name }} (Power: {{ selected.power }})</p>
      <p class="dark-text">Héroe Enemigo: {{ enemyHero.name }} (Power: {{ enemyHero.power }})</p>
      <p class="dark-text">{{ result }}</p>
    </div>
  </div>
</template>

<script>
import { useHeroStore } from '../stores/heroStore';
import { useHeroApiRandom } from '../stores/heroApiRandom';
import { useBattleStore } from '../stores/battleStore';
import { useAuthStore } from '../stores/authStore';

export default {
  props: ['selectedHero'],
  data() {
    return {
      selected: this.selectedHero || '',
      enemyHero: null,
      result: null,
      heroStore: useHeroStore(),
      heroApiRandom: useHeroApiRandom(),
      battleStore: useBattleStore(),
      authStore: useAuthStore(),
      resultHistory: null
    };
  },
  computed: {
    heroes() {
      return this.heroStore.heroes;
    },
    hasHeroes() {
      return this.heroes.length > 0;
    }
  },
  methods: {
    async getRandomHero() {
      const heroApiRandomStore = useHeroApiRandom();
      await heroApiRandomStore.fetchHeroes();
      const allHeroes = heroApiRandomStore.heroes;
      if (allHeroes.length === 0) {
        console.error('No hay héroes disponibles');
        return null;
      }
      const randomIndex = Math.floor(Math.random() * allHeroes.length);
      const randomHero = allHeroes[randomIndex];
      return { ...randomHero, power: randomHero.totalPower };
        },

    async startBattle() {
      this.result = '';
      this.enemyHero = null;

      let userHero = this.selected;
      
      if (!userHero) {
        userHero = await this.getRandomHero();
        if (!userHero) {
          console.error('No se pudo obtener un héroe para el usuario');
          return;
        }
      } else if (typeof userHero === 'string') {
        const heroFromStore = this.heroes.find(hero => hero.name === userHero);
        if (heroFromStore) {
          userHero = heroFromStore;
        } else {
          console.error('El héroe seleccionado no está definido');
          return;
        }
      }      
      const enemyHero = await this.getRandomHero();
      if (!enemyHero) {
        console.error('No se pudo obtener un héroe enemigo');
        return;
      }


      if (userHero.power > enemyHero.power) {
        this.result = '¡Tú ganas!';
        this.resultHistory = 'Ganaste'
          await this.updateCoins(10);
      } 
      else if (userHero.power < enemyHero.power) {
        this.result = '¡Tú pierdes!';
          this.resultHistory = 'Perdiste';
          await this.updateCoins(-10);
      } 
      else {
        this.result = '¡Es un empate!';
          this.resultHistory = 'Empataste'
      }

      const userId = this.authStore.user.id;
      this.battleStore.saveBattleResult(userHero.name, enemyHero.name, this.resultHistory, userId);
      
      // Actualiza la propiedad seleccionada con el héroe del usuario y su poder
      this.selected = {name:userHero.name, power:userHero.power};
      // Guarda el héroe enemigo con su poder
      this.enemyHero = { name: enemyHero.name, power: enemyHero.power };
    },
    async updateCoins(coinsChange){    
      let coins = this.authStore.quantCoints + coinsChange;
      let id = this.authStore.getId
      if(coins <= 0){
        coins = 100        
        window.alert(`Te quedaste sin monedas, toma te regalamos 100 \n
        ¡Te Aconsejamos agregar mas heroes a tu equipo! `);
      }  
      await this.authStore.updateCoins({id, coins});
    }
  },
  mounted() {
    this.heroApiRandom.fetchHeroes();
  }
};
</script>









