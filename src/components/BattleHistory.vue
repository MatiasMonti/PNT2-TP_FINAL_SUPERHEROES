<template>

          <tr>
            <td>{{ battle.characterName }}</td>
            <td>{{ battle.opponentName }}</td>
            <td>{{ battle.result }}</td>
          </tr>

  </template>
  
  <script>  
  export default {
    props: {
      battle: Object
    }
  }
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

/* .battle-table tr:nth-child(even) {
  background-color: #f2f2f2;
} */

/* .battle-table tr:nth-child(odd) {
  background-color: #e9e9e9;
} */

/* .battle-table tr:hover {
  background-color: #d1e7dd;
} */
/* .button {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
} */


</style>
  
  