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
    async clearSomeBattleHistory(userId, limit = 5) {
      try {
        // Obtener los primeros "limit" batallas del usuario
        const res = await axios.get(`https://666a37c72e964a6dfed7ec76.mockapi.io/api/historicalFights/historical?userId=${userId}`);
        const response = res.data.filter(history => history.userId === userId)
        if (response.data.length === 0) {
          window.alert('No hay batallas para eliminar.');
        }else{
        const battleIds = response.data.slice(0, limit).map(battle => battle.id);
        // Eliminar cada batalla por ID
        for (const id of battleIds) {
          await axios.delete(`https://666a37c72e964a6dfed7ec76.mockapi.io/api/historicalFights/historical/${id}`);
        }
          // Actualizar el estado local de batallas
          this.battles = this.battles.filter(battle => !battleIds.includes(battle.id));
        window.alert(`Se eliminaron los primeros ${limit} resultados de batalla.`);
        }
      } catch (error) {
        console.error(`Error al tratar de borrar los primeros ${limit} resultados de batalla:`, error);
        window.alert(`Error al tratar de borrar los primeros ${limit} resultados de batalla.`);
      }
    },

    async clearBattleHistory(userId) {
      try {
        // Obtener todas las batallas del usuario
        const res = await axios.get(`https://666a37c72e964a6dfed7ec76.mockapi.io/api/historicalFights/historical?userId=${userId}`);
        const response = res.data.filter(history => history.userId === userId)
        if (response.data.length === 0) {
          window.alert('No hay batallas para eliminar.');
        }else{
        const battleIds = response.data.map(battle => battle.id);
        // Eliminar cada batalla por ID
        for (const id of battleIds) {
          await axios.delete(`https://666a37c72e964a6dfed7ec76.mockapi.io/api/historicalFights/historical/${id}`);
        }
           // Actualizar el estado local de batallas
        this.battles = [];
        window.alert('Historial de batallas eliminado correctamente.');
        }
      } catch (error) {
        console.error('Error al tratar de borrar el historial de batallas:', error);
        window.alert('Error al tratar de borrar el historial de batallas.');
      }
    },

    async fetchBattleHistory(userId) {
      try {
        const response = await axios.get(`https://666a37c72e964a6dfed7ec76.mockapi.io/api/historicalFights/historical?userId=${userId}`);
        //nose si es la mejor opción pero funciona
        this.battles = response.data.filter(history => history.userId === userId);
      } catch (error) {
        console.error('Error al tratar de traer las batallas:', error);
      }
    }
  }
});
