<template>
  <div  class="head">我的密钥对 </div>
  <div class="list">
    <div v-for="item in list" :key="item.id" @click="onApply(item.id)">
      <div class="item">
        <div class="desc">{{item.uuid}}</div>
        <div class="title">{{item.ukey}}</div>
        <div class="title">{{item.ip}}</div>
        <div class="title">{{item.status}}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, reactive, toRefs } from "vue"
const useFetch = inject('useFetch');
const state = reactive({
  list:[]
})
onMounted(()=>{
  onList()
})
const onList = ()=>{
  useFetch().vip('apikey','list',{limit:10,offset:0}).then(res=>{
    state.list = res.data.list
    console.log('apikey',res)
  })
}
const onApply = () => {

}
const {list} = toRefs(state)
</script>

<style>

</style>