<template>
  <div id="app">
    <link href="https://stackpath.bootstrapcdn.com/bootswatch/4.1.3/lux/bootstrap.min.css" rel="stylesheet" integrity="sha384-ML9h/UCooefre72ZPxxOHyjbrLT1xKV0AHON1J+OlOV2iwcYemqmWyMfTcfyzLJ1" crossorigin="anonymous">
    <router-link :to="{ name: 'Team' }" style="padding: 0 15px 0 0;">Team</router-link>
    <router-link to="/brandon" style="padding: 0 15px 0 0;">Brandon</router-link>
    <router-link to="/joe" style="padding: 0 15px 0 0;">Joe</router-link>
    <router-link to="/nate1" style="padding: 0 15px 0 0;">Nate</router-link>
    <router-link to="/taylor1" style="padding: 0 15px 0 0;">Taylor</router-link>
    <router-link to="/tyler1" style="padding: 0 15px 0 0;">Tyler</router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

button {
  padding: 5px 20px 5px 20px;
}
</style>
