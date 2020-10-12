<template>
  <div id="app">
    <QcCodeScaner msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import QcCodeScaner from './components/QcCodeScaner.vue';
// import VConsole from 'VConsole'
export default {
  name: 'app',
  components: {
    QcCodeScaner
  }
}
</script>

<style>
html,body {
    height: 100%;
}
body {
    margin: 0;
}
p {
    margin: 0;
    padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
