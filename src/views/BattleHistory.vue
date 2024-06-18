<template>
    <div class="battle-chronicles">
      <h1 class="dark-text">Crónicas de Batallas</h1>
      <table class="battle-table">
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
  import { useBattleStore } from '@/stores/battleStore';
  import { useAuthStore } from '@/stores/authStore';
  import { mapStores } from 'pinia';
  
  export default {
    computed: {
      ...mapStores(useBattleStore, useAuthStore),
      battles() {
        return this.battleStore.battles;
      }
    },
    created() {
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
  </style>