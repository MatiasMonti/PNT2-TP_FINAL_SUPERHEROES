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
        console.error('Error saving battle result:', error);
      }
    },
    async fetchBattleHistory(userId) {
      try {
        const response = await axios.get(`https://666a37c72e964a6dfed7ec76.mockapi.io/api/historicalFights/historical?userId=${userId}`);
        this.battles = response.data;
      } catch (error) {
        console.error('Error fetching battle history:', error);
      }
    }
  }
});
