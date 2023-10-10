<template>
  <y-header aria="搜索" logo="Youloge"></y-header>
  <main class="search">
    <div class="search-content">
      <h1>搜索资源整合中...</h1>
    </div>
  </main>
  <y-footer></y-footer>
</template>
<script setup>
import { inject, reactive,onMounted } from "vue";
const useFetch = inject('useFetch');
const state = reactive({
  q:'',
  t:'',
  limit:10,
  offset:0
})
onMounted(()=>{
  state.q = new URL(location).searchParams.get('q');
  state.type = new URL(location).searchParams.get('t');
  onQuery()
})
const onQuery = ()=>{
  let {q,type,limit,offset} = state;
  useFetch().api('search','drive',{q,type,limit,offset}).then(res=>{
    console.log(res)
  }).catch(err=>{

  })
  useFetch().vip('search','indexes',{q,type,limit,offset}).then(res=>{
    console.log(res)
  }).catch(err=>{

  })
}
</script>

<style>

</style>