import { defineStore } from 'pinia';
import axios from 'axios';

export const useBattleStore = defineStore('battle', {
  state: () => ({
    battles: []
  }),
  actions: {
    async saveBattleResult(characterName, opponentName, result, userId) {
      try {
        const response = await axios.post('https://666a37c72e964a6dfed7ec76.mockapi.io/api/historicalFights/historical', {
          characterName,
          opponentName,
          result,
          userId
        });
        this.battles.push(response.data);
      } catch (error) {
        console.error('Error al tratar de guardar resultado:', error);
      }
    },

    //BORRAR HISTORIAL
     async clearBattleHistory(userId) {
       try {
         await axios.delete(`https://666a37c72e964a6dfed7ec76.mockapi.io/api/historicalFights/historical?userId=${userId}`);
        this.battles = []; 
        window.alert('Historial de batallas eliminado correctamente.');
      } catch (error) {
        window.alert('Error al tratar de borrar el historial de batallas:', error);
      }
     },
  
    async clearSomeBattleHistory(userId, limit = 5) {
      try {
        const response = await axios.delete(`https://666a37c72e964a6dfed7ec76.mockapi.io/api/historicalFights/historical?userId=${userId}&limit=${limit}`);
        this.battles.splice(0, limit);
        window.alert(`Se eliminaron los primeros ${limit} resultados de batalla.`);
      } catch (error) {
        window.alert(`Error al tratar de borrar los primeros ${limit} resultados de batalla:`, error);
      }
    },

    async fetchBattleHistory(userId) {
      try {
        const response = await axios.get(`https://666a37c72e964a6dfed7ec76.mockapi.io/api/historicalFights/historical?userId=${userId}`);
        this.battles = response.data;
      } catch (error) {
        console.error('Error al tratar de traer las batallas:', error);
      }
    }
  }
});
