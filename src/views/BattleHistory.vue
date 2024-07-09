<template>
  <div class="battle-chronicles">
    <h1 class="dark-text">Crónicas de Batallas</h1>
    <button @click="clearSomeBattleHistory">Borrar primeros 5 resultados de Batallas</button>
    <button @click="clearBattleHistory">Borrar todos los resultados de Batallas</button>

    <table class="battle-table">
      <thead>
        <tr>
          <th>Personaje</th>
          <th>Contrincante</th>
          <th>Resultado</th>
        </tr>
      </thead>
      <tbody>
        <Battle v-for="battle in battles" :key="battle.id" :battle="battle"/>
        
      </tbody>
    </table>
  </div>
</template>

<script>
import { useBattleStore } from '@/stores/battleStore';
import { useAuthStore } from '@/stores/authStore';
import { mapStores } from 'pinia';
import Battle from '@/components/BattleHistory.vue';

export default {
  components: {
        Battle
    },
    data(){
        return {
            battleStore: useBattleStore()
        }
    },
  computed: {
    ...mapStores(useBattleStore, useAuthStore),
    battles() {
      return this.battleStore.battles;
    }
  },
  methods: {
    clearBattleHistory() {
      const userId = this.authStore.user.id;
      this.battleStore.clearBattleHistory(userId);
    },
    clearSomeBattleHistory() {
      const userId = this.authStore.user.id;
      this.battleStore.clearSomeBattleHistory(userId);
    }
  },
   mounted() {
    const userId = this.authStore.user.id;
    this.battleStore.fetchBattleHistory(userId);
  }
};
</script>

<style scoped>
.battle-chronicles {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.battle-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #fff;
}

.battle-table th, .battle-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
  color: #333;
}

.battle-table th {
  background-color: #4CAF50;
  color: white;
}

.battle-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.battle-table tr:nth-child(odd) {
  background-color: #e9e9e9;
}

.battle-table tr:hover {
  background-color: #d1e7dd;
}
.button {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}


</style>
