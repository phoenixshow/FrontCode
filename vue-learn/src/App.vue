<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="<span style='color:#f00;'>瞅你咋地！</span>"/>
    <ev/>
    <!-- <com age="19"/> -->
    <com :age="ages" @patch="msg">
      <h1 slot="a">加在上面</h1>
      <h1 slot="b">我要加东西</h1>
    </com>
    <!-- <Vx/> -->
    <pagea/>
    <pageb/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import './components/n'
import ev from './components/events.vue'
import com from './components/Com.vue'
// import Vx from './components/Vuex.vue'
import pagea from './components/AA.vue'
import pageb from './components/BB.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    ev,
    com,
    // Vx
    pagea,
    pageb
  },
  data(){
    return {
      ages: 185
    }
  },
  methods:{
    msg: function(ag){
      console.log('msg')
      this.ages++
      console.log(ag)
    }
  }
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
</style>
