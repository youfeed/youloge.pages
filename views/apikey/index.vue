<template>
  <div  class="head">我的密钥对</div>
  <!-- <div @click="onApply">申请密钥</div> -->
</template>

<script setup>
import { inject, onMounted } from "vue"
const useFetch = inject('useFetch');
onMounted(()=>{
  onList()
})
const onList = ()=>{
  useFetch().vip('apikey','list',{limit:10,offset:0}).then(res=>{
    console.log('apikey',res)
  })
  useFetch().vip('drive','list',{limit:10,offset:0}).then(res=>{
    console.log('drive',res)
  })
}
const onApply = () => {
  useFetch().vip('apikey','apply',{ipv4:'0.0.0.0'}).then(res=>{
    console.log('onApply',res)
  })
}
</script>

<style>

</style>