<template >
    <div class="hero">
        <img :src="hero.image" :alt="hero.title" class="fav-hero-image"/>
        <div class="hero-info">
            <h3>Nombre Completo: {{hero.name}}</h3>
            <p class="light-text">Alias: {{hero.alias}}</p>
            <p class="light-text">Alter egos: {{hero.alterEgos}}</p>
            <p class="light-text">Lugar de nacimiento: {{hero.placeOfBirth}}</p>
            <p class="light-text">Genero: {{hero.gender}}</p>
            <p class="light-text">Raza: {{hero.race}}</p>
            <p class="light-text">Ocupación: {{hero.occupation}}</p>
            <p></p>
            <p class="light-text">Primera aparición:: {{hero.firstAppearance}}</p>
            <p class="light-text">Publicante: {{hero.publisher}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        hero: {
        type: Object,
        required: true
        }
    },
}    
</script>
  
<style >
.hero-info {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    position: relative;
    background-color: #000000;
  }  
.light-text {
  color: #ac9f9f;
}
</style>