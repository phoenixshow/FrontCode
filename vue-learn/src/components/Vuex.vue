<template>
    <div class="vuex">
        vuex
    </div>
</template>

<script>
import {mapActions} from 'vuex'

export default{
  methods: mapActions([
    'increment',
    'decrement'
  ])
}
</script>

<style>
</style>