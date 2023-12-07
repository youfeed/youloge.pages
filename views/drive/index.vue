<template>
  <div class="head">云盘管理 + 上传文件</div>
  <div class="body">
    <div class="list">
      <div class="item" v-for="item in list" :key="item.uuid" >
        <div class="poster">
          <div class="icon"><img :src="`https://img.youloge.com/mime/${item.mime}!80`" alt=""></div>
        </div>
        <div class="content">
          <div class="name" v-text="item.title"></div>
          <div class="desc">
            <span>{{ item.created }}</span>
            <span>{{ item.status }}</span>
          </div>
          <div class="action">
            <div @click="onClick('perview',item)">预览</div>
            <div @click="onClick('editor',item)">编辑</div>
            <div>撤回</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="foot"></div>
  
</template>

<script setup>
import { onMounted,inject,reactive, toRefs } from "vue";
const state = reactive({
  list:[]
})
const useFetch = inject('useFetch');
onMounted(()=>{
  useFetch().vip('drive','list',{limit:10,offset:0}).then(res=>{
    state.list = res.data.list;
    console.log(res)
  })
})
const onClick = (type,item)=>{
  let {uuid} = item
  let action = {
    perview:()=>{
      window.open(`https://www.youloge.com/drive?f=${uuid}`,'drive')
    },editor:()=>{
      location.hash = `drive/draft/uuid=${uuid}`
    }
  }
  action[type] ? action[type]() : null
  console.log(type,item)
}
const {list} = toRefs(state)
</script>

<style lang="scss" scoped>
.body{
  max-width: 600px;
  margin: 0 auto;
  .item{
    padding: 5px;
    border-radius: 5px;
    margin: 10px;
    display: flex;
    align-items: center;
    &:hover{
      box-shadow: 0 0 5px #333;
    }
    .content{
      flex: auto;
    }
    .action{
      display: flex;
      align-items: center;
      justify-content: space-between;
      div{
        cursor: pointer;
      }
    }
  }
}
</style>