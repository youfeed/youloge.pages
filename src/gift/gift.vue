<template>
  <y-header aria="礼品卡" aside="true" logo="Youloge" ></y-header>
  <main class="gift">
    <h1 class="title">Youloge.Gift 数字礼品卡</h1>
    <p>给亲朋好友赠送游戏的绝佳之选</p>
    <nav>
      <div>购买礼品卡</div>
      <div @click="onGift">兑换礼品卡</div>
    </nav>
    <div class="gift-container">
      <div>选择购买</div>
      <div>
        # 30.00 RGB
      </div>
      <div>
        # 50.00 RGB
      </div>
    </div>
    <div id="payment"></div>
    <div @click="onPay"> 支付 </div>
  </main>
</template>

<script setup>
import { onMounted,inject, reactive } from "vue";
const useFetch = inject('useFetch'),usePayment = inject('usePayment'), useStorage = inject('useStorage');
const state = reactive({
  // 内置支付单号
  local:{
    30:'88BBadyDmNui1L7ZTnwQ6FuaSJg1T',
    50:'88LHd1MyDLMJ2HevjYkeXwgZUKn5r',
    100:'88NEiv4oBabxZouZxxsp19VvzE45r',
    300:'YkS1WSvuyunNxsCxwtvd29u9J6RVV',
    500:'YkS1WSvuyunNxsCxwtvd29u9J6RVV',
  }
})
onMounted(()=>{

})

const onPay = ()=>{
  let {mail} = useStorage('youloge')
  usePayment({
    selector:'#payments',
    mail:mail,
    local:'88BBadyDmNui1L7ZTnwQ6FuaSJg1T',
    money: 1,
    notify: 'https://www.youloge.com/notify',
  }).then(res=>{
    console.log(res)
  }).catch(err=>{
    console.log(err)
  })
}
// 兑换 序列号+密码
const onGift = ()=>{
  
  console.log('gift')
}
</script>

<style lang="scss">
.gift{
  max-width: 720px;
  margin: 0 auto;
  .title{
    font-size: 24px;
  }
}

</style>