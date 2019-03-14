<template>
  <div id="app">
    <WeatherApp/>
  </div>
</template>
<script>
/* eslint-disable */
import WeatherApp from '@/components/WeatherApp'

export default {
  name: 'App',
  components: { WeatherApp }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i');
  * {
    margin: 0;
    padding: 0;
    box-sizing: content-box;
  }
  body{
    background: #E1E2E1;
    font-size: 14px;
    @media screen and (max-width: 780px){
      background: rebeccapurple;
    }
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    font-family: Lato;
    min-height: 100vh;

  }
</style>
