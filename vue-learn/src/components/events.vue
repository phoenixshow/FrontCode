<template>
    <div class="events">
        <button type="button" v-on:click="msg('s', $event)">test</button>
        <button type="button" @click="counter += 1">test2</button>
        <div class="parent" @click="parent">
          <p>parent</p>
          <p>parent</p>
          <p>parent</p>
          <div class="child" @click.stop="child">
            child
          </div>
        </div>
    </div>
</template>

<script>
    export default{
      data(){
        return {
          counter: 0
        }
      },
      methods: {
        msg: function(a, event){
          console.log(Math.random(), a, event);
        },
        parent(){
          console.log('parent')
        },
        child(){
          console.log('child')
        }
      }
    }
</script>

<style>
</style>