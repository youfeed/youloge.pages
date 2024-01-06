<template>
  <div>上传文件:不限制文件格式</div>
  <div>
    <label for="file"></label>
    <input id="file" type="file"  />
  </div>
</template>

<script setup>
import { reactive,toRefs } from "vue"

const state = reactive({
  file:null
})
const {} = toRefs
</script>

<style>

</style>