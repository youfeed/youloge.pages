<template>
  <div class="welcome" @click="onClick">233352616 - {{ connt }}</div>
</template>

<script setup>
import { reactive, toRefs } from "vue";

const state = reactive({
  connt:0
})
const onClick = ()=>{
  state.connt++;
}
const {connt} = toRefs(state)
</script>

<style lang="scss">
.welcome{
  background: #fff;
}
</style>