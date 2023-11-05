<template>
  <y-header logo="Youloge" aria="视频"></y-header>
  <main class="video">
    <div>
      <y-video v-if="uuid" :uuid="uuid" :poster="`//img.youloge.com/${poster}1`"></y-video>
    </div>
    <div class="metadata">
      <h1 class="title">{{ title }}</h1>
      <p>{{ intro }}</p>
    </div>
    <y-discuss :uuid="uuid" v-show="uuid"></y-discuss>
  </main>
</template>

<script setup>
import { inject, onMounted, reactive,toRefs,watch } from "vue";
const useDialog = inject('useDialog'),useFetch = inject('useFetch');
const state = reactive({
  uuid:null,
  title:'',
  intro:'',
  poster:'',
  etag:null,
  label:'',
  created:'',
  author:'',
})
onMounted(()=>{
  state.uuid = new URL(location).searchParams.get('v');
  state.uuid ? onInfo() : useDialog('alert',{title:'视频UUID不正确',content:'请检查URL是否正确'})
})
const onInfo = ()=>{
  useFetch().api('video','info',{uuid:state.uuid}).then(({err,msg,data})=>{
    Object.assign(state, data);
    console.log(err,msg,state.etag)
  }).catch(({err,msg})=>{
    useDialog('alert',{title:`数据请求错误#${err}`,content:msg})
  })
}
const {uuid,title,intro,poster,label,etag,created} = toRefs(state);
// 标题
watch(
  () => state.title,
  (value, _) => {
    document.title = `${value} - Youloge.视频`
  }, {immediate:true}
)
</script>

<style lang="scss">
.video{
  max-width: 680px;
  margin: 0 auto;
  .title{
    font-size: 24px;
  }
}
</style>