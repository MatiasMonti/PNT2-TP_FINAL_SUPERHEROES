<template>
  <div>
    <h1 class="dark-text">Batallas</h1>
    <div class="Hero-list">
      <Hero 
        v-for="hero in Heroes" 
        :key="hero.id" 
        :hero="hero" 
        @selectHero="selectHero"
      />
    </div>
    <Battle :selectedHero="selectedHero" />
  </div>
</template>

<script>
import { useHeroStore } from '../stores/heroStore';
import { useAuthStore } from '../stores/authStore';
import Hero from '../components/FavoritesHeroes.vue';
import Battle from '../components/Battle.vue';

export default {
  components: {
    Hero,
    Battle
  },
  data() {
    return {
      heroStore: useHeroStore(),
      authStore: useAuthStore(),
      selectedHero: null
    };
  },
  computed: {
    Heroes() {
      return this.heroStore.heroes;
    }
  },
  methods: {
    fetchHeroes() {
      this.heroStore.fetchHeroes(this.authStore.id);
    },
    selectHero(hero) {
      this.selectedHero = hero;
    }
  },
  mounted() {
    this.fetchHeroes();
  }
};
</script>

<style scoped>
.Hero-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  padding: 16px;
  color: #333;
}
</style>


