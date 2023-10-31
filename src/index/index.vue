<template>
  <y-header logo="Youloge" aria="com"></y-header>
  <div class="welcome">
    <main>
      <div v-for="(province,index) in root" :key="index">
        
      </div>
    </main>
    <section class="footer">
      <p>皖ICP备 19004549号 公安备 34112402000344</p>
    </section>
  </div>
  <hash-view></hash-view>
</template>
<script setup>
import { inject, onMounted, reactive, toRefs } from "vue";
const useFetch = inject('useFetch');
const state = reactive({
  root:[],
  query:'',
  type:'',
  label:'',
  limit:10,
  offset:0,
  connt:0
});
onMounted(()=>{
  // onShow()
})
const onShow = ()=>{
  useFetch().api('search','welcome',{query:'0',limit:10,offset:0}).then(res=>{
    console.log(res)
  })
}
const onClick = ()=>{
  state.connt++;
}
const {connt,root} = toRefs(state)
</script>
<style lang="scss">
.welcome{
  padding: 40px 0 0;
  position: relative;
  overflow: hidden;
  background: #f2f2f2;
  height: 100vh;
  text-align: center;
  h1,h2,h3{
    color: #fff;
  }
  h1{
    font-size: 48px;
    font-weight: 200;
    line-height: 60px;
  }
  main{
    margin-top: 50px;
    margin-top: 50px;
    display: inline-block;
    background: #333;
    padding: 10px;
    border-radius: 14px;
    &:hover{
      border: 1px solid #fff;
    }
    .github{
      display: flex;
      gap: 5px;
    }
  }
  .footer{
    position: absolute;
    bottom: 0;
    text-align: center;
    width: 100%;
    color: #aaa;
  }
}
</style>