<template>
  <div>
    <y-header></y-header>
    <h1>充值</h1>
  </div>
</template>
<script setup>
import { reactive, toRefs,onMounted } from "vue";
const state = reactive({})
onMounted(() => {
  let profile = localStorage.getItem('profile')
  console.log(profile)
})
const {} = toRefs(state)
</script>
<style>

</style>