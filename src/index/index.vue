<template>
  <div class="welcome">
    <!-- <main>
      <div v-for="(item,index) in list" :key="index" class="search">
        <div class="item" :data-uuid="item.uuid">
          {{ item.title }}
        </div>
      </div>
    </main> -->
    <h1>Youloge.com</h1>
    <section class="footer">
      <a href="https://beian.miit.gov.cn/">
        <p>皖ICP备 19004549号 公安备 34112402000344</p> 
      </a>
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
  list:0,
  count:0
});
onMounted(()=>{
  onShow()
})
const onShow = ()=>{
  useFetch().api('search','welcome',{query:'',limit:10,offset:0}).then(res=>{
    state.count = res.data.count
    state.list = res.data.list
    // console.log(res)
  })
}
const onClick = ()=>{
  state.connt++;
}
const {count,list,root} = toRefs(state)
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
    color: #222;
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