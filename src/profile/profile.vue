<template>
  <y-header aria="个人中心" aside="true" logo="Youloge" ></y-header>
  <main class="profile">
    <div class="head">
      <div class="avatar">
        <img :src="`https://img.youloge.com/${profile.avatar}!300`" alt="logo">
      </div>
      <div class="s">
        <h1 class="name">{{profile.name}}</h1>
        <div class="meta">
          <div class="intro">{{profile.intro || '没有介绍~'}} {{ profile.created }}</div>
        </div>
        <div class="follow">
          <button>单向订阅</button>
        </div>
      </div>
    </div>
    <div class="navbar">
      <template v-for="item in navbar" :key="item">
        <div >{{ item.name }}</div>
      </template>
    </div>
    <div class="body">
      <div class="uuid">@{{profile.uuid}}</div>
      <div class="article">
        <div>我没有关于我哦~</div>
      </div>
    </div>
  </main>
</template>

<script setup>
import {inject, onMounted, reactive, toRefs} from 'vue'
const useFetch = inject('useFetch'),useDialog = inject('useDialog');
const state = reactive({
  uuid:new URL(location).searchParams.get('u'),
  profile:{
    name:'',
    avatar:'FjjHFE7RwJqfjiwM9aqL4G53kPv3'
  },
  navbar:[
    {name:'文章',url:'/article'},
    {name:'文件',url:'/article'},
    {name:'视频',url:'/article'},
    {name:'订阅',url:'/subscribe'},
  ]
})
onMounted(()=>{
  // state.uuid = new URL(location).searchParams.get('u');
  useFetch().api('profile','info',{uuid:state.uuid}).then(({err,msg,data})=>{
    err == 200 ? (Object.assign(state.profile,data)) : useDialog('alert',{title:`数据错误#${err}`,content:msg})
  }).catch(err=>{
    console.log(err)
  })
})
const {profile,navbar} = toRefs(state)
</script>

<style lang="scss">
.profile{
  max-width: 680px;
  margin: 0 auto;
  margin-top: 40px;
  .head,.body{
    margin: 0 5px;
  }
  .head{
    display: flex;
    align-items: center;
    .meta{
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    }
    .avatar{
      margin-right: 10px;
      height: 120px;
      width: 120px;
      img{
        border-radius: 50%;
        border: 1px solid #eee;
        padding: 5px;
      }
    }
    .intro{
      font-size: 14px;
      color: #888;
    }
    .name{
      font-size: xx-large;
    }
    .follow{
      button{
        background: #4CAF50;
        padding: 5px 20px;
        color: #fff;
        border-radius: 11px;
      }
    }
  }
  .navbar{
    gap: 10px;
    display: flex;
    margin: 20px 0;
    overflow-x: auto;
    border-bottom: 1px solid #cdcdcd;
    div{
      padding: 5px 10px;
      cursor: pointer;
      line-height: 30px;
      &.active{
        text-decoration: 4px solid underline;
      }
      &:hover{
        text-decoration: 4px solid underline;
      }
    }


  }
  .body{
    border: 1px solid #9E9E9E;
    padding: 10px 5px;
    border-radius: 5px;
    min-height: 80px;
    .uuid{
      font-size: 12px;
      text-align: right;
      color: #222;
      border-bottom: 1px solid #eee;
    }
    .article{
      padding: 20px 0;
    }
  }
}

</style>