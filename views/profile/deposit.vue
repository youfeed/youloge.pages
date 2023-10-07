<template>
  <header h-15 flex items-center>
    <h1 pl-8 text-xl font-semibold >余额充值</h1>
  </header>
  <div class="relative bg-white mt-20 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
    <div>
      <div>账户：1124@qq.com</div>
    </div>
    <div>充值金额：</div>
    <div>
      <template v-for="item in moneys" :key="item">
        <button @click="toggleMoney(item)" :class="{'bg-sky-500':item==active.money}" relative flex-none rounded-md text-sm font-semibold leading-6 py-1.5 px-3 hover:bg-sky-400 bg-gray-500 text-white shadow-sm >{{item}}</button>
      </template>
    </div>
    <div v-if="qrCode">
      <img :src="qrCode" w-50 h-50 >
    </div>
    <button @click="onEnter">支持 微信|支付宝</button>
  </div>
</template>
<script setup>
import { computed, inject, onMounted, reactive,toRefs } from "vue"
const useFetch = inject('useFetch');
// console.log(youloge)
const state = reactive({
  active:{
    type:'wxpay',
    money:'10.00',
    qrcode:null
  },
  types:[
    {
      icon:'微信支付',
      name:'微信支付',
      desc:'使用微信扫一扫',
    },{
      icon:'微信支付',
      name:'支付宝',
      desc:'使用支付宝扫一扫',
    },
  ],
  moneys:['10.00','30.00','99.00','300.00','618.00'],
  qrurl:'',
  money:'10.00',
})
onMounted(()=>{
  getBalance()
})
// 实时余额
const getBalance = ()=>{
  useFetch().vip('wallet','balance').then(res=>{
    console.log(res)
  })
}
// 付款码 u=uuid m= mail 
const qrCode = computed(()=>{
  let {money,qrcode} = state.active;
  let url = encodeURIComponent(qrcode);
  return `https://qun.qq.com/qrcode/index?data=${url}`;
})
//
const onEnter = ()=>{
  let {type,money} = state.active
  useFetch().api('wallet','deposit',{'mail':'11247005@qq.com',type:type,'money':money*100 >> 0}).then(res=>{
    state.active.qrcode = res.data.qrcode;
    console.log(res);
  }).catch(err=>{

  })
}
const toggleMoney = (money)=>{
  state.active.money = money;
}
const {active,types,money,moneys} = toRefs(state);
</script>

<style>

</style>