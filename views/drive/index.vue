<template>
  <div class="head">云盘管理</div>
  <div class="body">
    <div>
      <label for="file">上传文件</label>
      <input type="file" name="file" id="file" @change="onChange">
    </div>
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
            <div @click="onClick('submit',item)">发布</div>
            <div>撤回</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="drawer" show="true">
    <div class="head">
      <div class="title">编辑元数据</div>
      <div class="close" @click="$emit('close')"></div>
    </div>
    <div class="body">
      <form @submit="onSubmit">
        <div>
          <label for="title">标题</label>
          <input type="text" name="title" id="title" v-model="active.title">
        </div>
        <div>
          <label for="intro">描述</label>
          <input type="text" name="intro" id="intro" v-model="active.intro">
        </div>
        <div>
          <label for="label">标签</label>
          <input type="text" name="label" id="label" v-model="active.label">
        </div>
      </form>
    </div>
  </div>
  <div class="foot"></div>
</template>

<script setup>
import { onMounted,inject,reactive, toRefs } from "vue";
const state = reactive({
  list:[],
  active:{}
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
      location.hash = `drive/draft`
    },submit:()=>{
      useFetch().vip('drive','submit',{uuid:uuid}).then(res=>{
        console.log(res)
      })
    }
  }
  console.log(type,item)
  action[type] ? action[type]() : null
}
const onChange = (e)=>{
  let [file] = e.target.files
  console.log(file)
  // let formData = new FormData()
  // formData.append('file',file)
  // useFetch().vip('drive','upload',formData).then(res=>{
  //   console.log(res)
  // })
}
const {list,active} = toRefs(state)
</script>

<style lang="scss" scoped>
.head{
  height: 60px;
}
.body{
  max-width: 600px;
  margin: 0 auto;
  height: 100vh;
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