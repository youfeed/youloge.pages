<template>
  <div class="welcome">
    <section class="header">
      <h1>Youloge Pages</h1>
      <h2>基于开放接口Youloge.io 实现的多入口单页</h2>
      <h3>vite + vue + youloge</h3>
    </section>
    <main>
      <a href="https://github.com/youfeed/youloge.pages" >
      <section class="one">
        <h1>Github</h1>
        <div class="github">
          <img src="https://img.shields.io/github/stars/youfeed/youloge.pages?style=flat-square" alt="Github Stars" />
          <img src="https://badgen.net/github/license/youfeed/youloge.pages?style=flat-square" alt="Github Version" />
        </div>
      </section>
    </a>
    </main>
    <section class="footer">
      <p>皖ICP备 19004549号 公安备 34112402000344</p>
    </section>
  </div>
</template>

<script setup>
import { reactive, toRefs } from "vue";

const state = reactive({
  connt:0
})
const onClick = ()=>{
  state.connt++;
}
const {connt} = toRefs(state)
</script>

<style lang="scss">
.welcome{
  padding: 40px 0 0;
  position: relative;
  overflow: hidden;
  background: #222;
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