<template>
  <y-header logo="Youloge" aria="外链"></y-header>
  <main class="link" mx-auto flex flex-col p-1 max-w-3xl mx-10  shadow-md mt-2 shadow-slate-500>
    <h1 text-2xl>超级链接中转服务</h1>
    <div>
      <div border-cyan b-2 p-1 flex f-c-b rd>
        <input type="url" v-model="url"  placeholder="请输入任意协议链接" pattern="url" flex-auto b-0 outline-unset c-coolGray/>
        <button v-login="onConvert">转化</button>
      </div>
      <div >
        <div>URL合法性检测: <span c-red>{{ error }}</span></div>
      </div>
      <div>
        <div border-bluegray b-2 p-1 flex f-c-b rd>
          <input placeholder="转化结果" v-model="result" readonly  flex-auto b-0 outline-unset c-coolGray/>
          <a v-copy="onCopy">复制</a>
        </div>
      </div>
    </div>
  </main>
  <section mx-auto flex flex-col p-1 max-w-3xl mx-10 shadow-md mt-2>
    <div>支持那些链接</div>
    <div>任意链接：只要符合网络协议规范，例如打开微信，甚至加载一段脚本</div>
  </section>
</template>

<script setup>
import { toRefs,inject, reactive } from "vue";
const state = reactive({
  url:'',
  result:'',
  error:''
})
const useFetch = inject('useFetch'),useDialog = inject('useDialog');
const onCopy = ()=>{
  return state.result
}
const onConvert = ()=>{
  try {
    const {protocol} = new URL(state.url);
    
    useFetch().vip('material','link',{href:state.url}).then(({err,msg,data})=>{
      err == 200 ? state.result = `https://open.youloge.com/link?target=${data.uuid}` : useDialog('alert',{title:`数据请求错误#${err}`,content:msg})
      state.error = data.hash
    }).catch(({err,msg})=>{
      useDialog('alert',{title:`数据请求错误#${err}`,content:msg})
    })
  } catch (error) {
    state.error = `URL 不合法`
  }
}
const {url,result,error} = toRefs(state)
</script>

<style lang="scss">

</style>