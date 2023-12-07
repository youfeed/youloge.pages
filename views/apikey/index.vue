<template>
  <div  class="head">我的密钥对</div>
  <div @click="onApply">申请密钥</div>
</template>

<script setup>
import { inject } from "vue"

const useFetch = inject('useFetch')
const onApply = () => {
  useFetch().vip('apikey','apply',{ipv4:'0.0.0.0'}).then(res=>{
    console.log('onApply',res)
  })
}
</script>

<style>

</style>