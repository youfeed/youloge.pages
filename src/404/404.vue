<template>
  <div class="not-found">
    <div class="not-found-img">
      <img src="https://http.cat/404" alt="">
    </div>
    <div class="not-found-text">
      <h1>404</h1>
      <p>你访问的页面不存在</p>
      <p>请检查你的输入是否正确</p>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss">
.not-found{
  margin-top: 50px;
  .not-found-img{
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      max-width: 300px;
    }
  }
  .not-found-text{
    text-align: center;
  }
}
</style>