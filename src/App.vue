<script setup>
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div id="app" class="app-container">
    
    <Navbar />
    <div class="content">
      <router-view />
    </div>
    <footer class="footer">
      <a href="https://github.com/MatiasMonti/PNT2-TP_FINAL_SUPERHEROES" target="_blank">
        <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" style="width:50px;height:50px;">
      </a>
    </footer>
  </div>
</template>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  background-color: rgb(10, 8, 8); 
  font-family: Arial, sans-serif;
 
}

#app {
  min-height: 100vh; 
  display: flex;
  flex-direction: column;
  background-image: url(https://png.pngtree.com/thumb_back/fw800/background/20231229/pngtree-dynamic-clash-comic-style-sunburst-texture-sets-the-stage-for-heroic-image_13929819.png);
  background-attachment: fixed;
  background-size: cover;
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100vw;
  align-items: center;
}

.content {
  flex-grow: 1; 
  background-color: #ffffff; 
  padding: 20px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: 20px;
  width: 100%;
  max-width: 900px; /* Aumentar el tamaño máximo del contenedor */
}

.footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 1rem;
  border-top: 2px solid #444;
  width: 100%;
}

@media (min-width: 768px) {
  .content {
    padding: 40px;
    margin: 40px;
  }
}
</style>
