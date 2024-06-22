<template>
    <div>
      <h1>Historial de Batallas</h1>
      <button @click="clearSomeBattleHistory">Borrar primeros 5 resultados de Batallas</button>
      <button @click="clearBattleHistory">Borrar todos los resultados de Batallas</button>
      <table>
        <thead>
          <tr>
            <th>Personaje</th>
            <th>Contrincante</th>
            <th>Resultado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="battle in battles" :key="battle.id">
            <td>{{ battle.characterName }}</td>
            <td>{{ battle.opponentName }}</td>
            <td>{{ battle.result }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ['userId'],
    data() {
      return {
        battles: []
      };
    },
    created() {
      this.fetchBattleHistory();
    },
    methods: {
      async fetchBattleHistory() {
        try {
          const response = await axios.get(`https://666a37c72e964a6dfed7ec76.mockapi.io/api/historicalFights/historical?userId=${this.userId}`);
          this.battles = response.data;
        } catch (error) {
          console.error('Error fetching battle history:', error);
        }
      },
      async clearSomeBattleHistory() {
      try {
        const idsToDelete = this.battles.slice(0, 5).map(battle => battle.id);
        for (const id of idsToDelete) {
          await axios.delete(`https://666a37c72e964a6dfed7ec76.mockapi.io/api/historicalFights/historical/${this.userId}`);
        }
        this.fetchBattleHistory();
      } catch (error) {
        console.error('Error clearing some battle history:', error);
      }
    },
      async clearBattleHistory() {
      try {
        for (const id of idsToDelete) {
          await axios.delete(`https://666a37c72e964a6dfed7ec76.mockapi.io/api/historicalFights/historical/${this.userId}`);
        }
        this.fetchBattleHistory();
      } catch (error) {
        console.error('Error clearing battle history:', error);
      }
    }
    }
  };
  </script>

  
  