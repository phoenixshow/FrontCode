<template>
    <div class="com">
      <slot name="a"/>
      child components
      {{name}} {{age}}
      <button type="button" @click="$emit('patch', 34)">发送到父组件</button>
      <slot name="b"/>
    </div>
</template>

<script>
export default{
  props: ['age'],
  data(){
    return {
      name: 'com'
    }
  }
}
</script>

<style>
</style>