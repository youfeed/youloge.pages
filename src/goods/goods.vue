<template>
  <y-header aria="商城" aside="true" logo="Youloge" ></y-header>
  <main class="goods">
    <div class="present">
      <div class="gallery" current="0" ref="swiper" >
        <div class="image" data-index="0"  style="background:#f00;width: 100%; height: 100%;">
          <!-- <img src="https://img.youloge.com/Fma04G7O9v6f0HjvN59djgwpJ2hE!1"> -->
        </div>
        <div class="image" data-index="0"  style="background:#f00;width: 100%; height: 100%;">
          <!-- <img src="https://img.youloge.com/Fma04G7O9v6f0HjvN59djgwpJ2hE!1"> -->
        </div>
        <div class="image" data-index="0"  style="background:#f00;width: 100%; height: 100%;">
          <!-- <img src="https://img.youloge.com/Fma04G7O9v6f0HjvN59djgwpJ2hE!1"> -->
        </div>
      </div>
      <div class="title">{{item.title}}</div>
      <div class="price">
        <div>参考价格：</div>
        <div><span>#<span>50.00</span>RGB</span></div>
        <y-rgb value="500"></y-rgb>
      </div>
    </div>
    <div class="legend">代理商户：<small>全国包邮 48小时内发货</small></div>

    <div class="spus">
      <template v-for="item in spu.list" :key="item.uuid">
        <div class="spu">
          <div class="avatar">
            <img :src="`https://img.youloge.com/${item.avatar}!80`" alt="">
          </div>
          <div class="context">
            <div>{{item.name}}</div>
            <div>有问题找团长</div>
          </div>
          <div class="buy" @click="onShopping(item)">跟着团长</div>
        </div>
      </template>
    </div>

    <div class="skus">
      <template v-for="item in sku.list" :key="item.uuid">
        <div class="sku">
          <div>套餐名称 缩略图</div>
          <div class="sku">
            <div>价格 库存</div>
          </div>
        </div>
      </template>
    </div>

    <div class="legend">累计评价</div>
    <div class="discuss">
      暂无评论
    </div>

    <div class="legend">商品详情</div>
    <div class="details">
      <div class="intro"></div>
      <div class="detail">
        <template v-for="(item,index) in item.detail" :key="index">
          <img :src="`https://img.youloge.com/${item.uuid}!1`" :usemap="`#map-${index}`" :alt="item.alt">
          <map :name="`#map-${index}`" v-if="item.area">
            <template v-for="(items,indexs) in item.area" :key="indexs">
              <area :shape="items.shape" :coords="items.coords" :href ="`https://youloge.com/goods?g=${items.href}`"/>
            </template>
          </map>
        </template>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, inject, nextTick, onMounted,reactive, toRefs } from "vue";
const useFetch = inject('useFetch'),useDialog = inject('useDialog'),useShopcart = inject('useShopcart'),usePayment = inject('usePayment');
const state = reactive({
  swiper:null,
  uuid:'',
  title:'',
  poster:'',
  gallery:[],
  detail:[],
  item:{
    uuid:'',
    title:'',
    poster:'',
    gallery:[],
    detail:[],
  },
  // 商户SPU
  spu:{
    uuid:'',
    list:[]
  },
  // 套餐SKU
  sku:{
    uuid:'',
    list:[]
  }
});
onMounted(()=>{
  state.uuid = new URL(location).searchParams.get('g');
  useFetch().api('goods','info',{uuid:state.uuid}).then(({err,msg,data})=>{
    err == 200 ? (Object.assign(state.item,data),onSpu()) : useDialog('alert',{title:`数据错误#${err}`,content:msg})
    setTimeout(()=>{
      nextTick(()=>onSwiper())
    },100)
  })
})
const onSwiper = ()=>{
  let {swiper,item:{gallery}} = state;
  let {clientWidth} = swiper
  let [one,two,three] = swiper.childNodes
  let leep = [0,100,-100];
  let loop = [one,two,three];
  console.log(swiper.childNodes)
  const onLoop = (diff=0) => (loop.forEach((item,key)=>{
    item.style.transform = `translate(${leep[key]-diff}%, 0px) translateZ(0px)`;
    item.style.background = `url(https://img.youloge.com/${gallery[key]}!1) #ffee99 center center no-repeat`
  }),false);
  // 初始一次
  let run = onLoop();
  // 主要逻辑
  const onMove = (MX)=>{
    if(run){
      let diff = ((run - MX) / clientWidth * 100) >> 0;
      if(Math.abs(diff) > 20){
        if(diff > 0){
          let pop = leep.pop();leep.unshift(pop);
        }else{
          let shift = leep.shift();leep.push(shift);
        }
        run = onLoop();
      }else{
        onLoop(diff);
      }
    }
  }
  // 开始
  swiper.onmousedown = ({clientX}) => run = clientX;
  swiper.ontouchstart = ({touches:[{clientX}]})=>run = clientX;
  // 移动
  swiper.ontouchmove = ({touches:[{clientX}]})=>onMove(clientX);
  swiper.onmousemove = ({clientX}) => onMove(clientX);
  // 结束
  swiper.ontouchend = ()=>run = onLoop();
  swiper.onmouseup = () => run = onLoop();
  swiper.onmouseleave = ()=>run = onLoop()
}
// 轮播组件
const onShopping = (item)=>{

  // 下单组件
  useShopcart({
    Selector:'',
    uuid: 'sku.uuid',
    mail:'11247005@qq.com',
  }).then(res=>{
    let {local,money} = res.data
    console.log(res)
    // 支付组件
    usePayment({
      Selector:'',
      uuid:state.item.uuid,
      mail:'11247005@qq.com',
      local:local,
      money:money,
      notify:'https://www.youloge.com/notify'
    }).then(res=>{

    })
    
  })
  console.log(item,useShopcart);
}
// 加载商户
const onSpu = ()=>{
  let {uuid} = state.item;
  useFetch().api('goods','spu',{uuid:uuid}).then(res=>{
    Object.assign(state.spu.list,res.data)
    console.log(res);
  })
}
// 加载套餐
const onSku = ()=>{
  let {uuid} = state.spu;
  useFetch().api('goods','spu',{uuid:uuid}).then(res=>{
    Object.assign(state.sku.list,res.data)
    console.log(res);
  })
}
const {swiper,uuid,title,item,spu,sku} = toRefs(state)
</script>

<style lang="scss">
.goods{
  max-width: 680px;
  margin: 0 auto;
  .present{
    border-radius: 5px;
    box-shadow: 1px 1px 4px #EEE;
  }
  .gallery{
    position: relative;
    aspect-ratio: 1;
    width: 100%;
    overflow: hidden;
    cursor: grabbing;
    user-select: none;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    .image{
      position: absolute;
    }
  }
  .title{
    font-size: 24px;
    padding: 10px;
    letter-spacing: -2px;
    line-height: normal;
  }
  .price{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
  }
  .spus{
    padding: 10px;
    box-shadow: 1px 1px 5px #999999;
    margin: 5px;
    .spu{
      display: flex;
      gap: 5px;
      align-items: center;
      .context{
        flex: auto;
      }
      .buy{
        background: #dd1919;
        color: #fdfdfd;
        padding: 5px 10px;
        border-radius: 2px;
        cursor: pointer;
      }
    }
  }
  .legend{
    color: #333;
    border-left: 4px solid #673AB7;
    padding-left: 10px;
    margin-top: 20px;
  }
}
</style>