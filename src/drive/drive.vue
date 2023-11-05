<template>
  <div>
    <y-header logo="Youloge" aria="云文件"></y-header>
    <main class="drive" mx-auto flex flex-col p-1 max-w-3xl mx-10  shadow-md mt-2 shadow-slate-500>
      <div class="box" flex-col style=" width: 100%; padding: 10px; ">
        <div class="head">
          <details style=" border-left: 4px solid #8BC34A; padding-left: 20px; ">
            <summary style="font-size: 18px;">{{title}}<b>{{format}}</b></summary>
            <p style=" padding: 10px; color: #666; ">{{intro}}</p>
          </details>
        </div>
        
        <div class="body" style="background: rgb(238, 238, 238);padding: 10px;width: 100%;margin-top: 20px;border-radius: 10px;">
          <div class="item">
            <span>类型</span>
            <span>{{mime}}</span>
          </div>
          <div class="item">
            <span>大小</span>
            <span>{{sized}}</span>
          </div>
          <div class="item">
            <span>创建时间</span>
            <span>{{created}}</span>
          </div>
          <div class="item">
            <span>更新时间</span>
            <span>{{updated}}</span>
          </div>
          <div class="item" v-copy="onCopy">
            <span>资源外链</span>
            <span class="copylink" style="color: #8BC34A;cursor: pointer;">点击复制外链</span>
          </div>
        </div>
        <div class="foot">
          <div class="down" style=" display: flex; align-items: center; justify-content: space-around;">
            <div class="left" style=" text-align: center; ">
              <img :src="qrcode">
              <a href="javascript:;" v-login="shareing" class="share">手机扫码访问</a>
            </div>
            <div class="right">
              <div class="cost" style="display: flex;align-items: flex-end;">
                <div class="y-rgb"># <span style=" font-size: 30px; font-weight: bold; ">{{ (cost / 100).toFixed(2) }}</span> RGB 约</div>
                <y-rgb :value="cost"></y-rgb>
              </div>
              <div class="load" v-login="download" style=" background: #4CAF50; padding: 5px; border-radius: 5px; display: flex; flex-direction: column; align-items: center; color: #fff; cursor: pointer;">
                <div style=" font-size: 20px; ">立即下载(无限速)</div>
                <p>24小时内重复点击下载不收费</p>
              </div>
            </div>
          </div>
          <div class="rule" style=" display: flex; align-items: center; justify-content: center; margin-top: 50px;">
            <ul style=" color: #666; font-size: 12px;font-family: monospace;">
              <li>文件标识：{{ uuid }}</li>
              <li>来源标识：{{ author }}</li>
              <li>哈希标识：{{ etag }}</li>
              <li>但行好事 莫问前程</li>
            </ul>
          </div>
        </div>
      </div>
      <y-discuss :uuid="uuid" v-show="uuid"></y-discuss>
    </main>
    <y-footer></y-footer>
    <hash-view></hash-view>
  </div>
</template>

<script setup>
import { computed, inject,onMounted,reactive,watch,toRefs } from 'vue';
const useFetch = inject('useFetch'), useDialog = inject('useDialog'),useMessage = inject('useMessage'),useLoading = inject('useLoading'),usePayment = inject('usePayment');
const useStorage = inject('useStorage');

let state = reactive({
  uuid:'',
  title:'',
  intro:'',
  format:'',
  mime:'',
  etag:'',
  size:0,
  cost:'',
  author:'',
  created:'',
  updated:'',
  record:{},
  downlink:null
})
// 初始info
onMounted(()=>{
  let s = localStorage.getItem('youloge')
  console.log(s)
  state.uuid = new URL(location).searchParams.get('f');
  
  state.uuid ? useFetch().api('drive','info',{uuid:state.uuid}).then(({err,msg,data})=>{
    Object.assign(state, data);
  }).catch(({err,msg})=>{
    useDialog('alert',{title:`数据请求错误#${err}`,content:msg})
  }) : useDialog('alert',{title:'云文件过期或失效',content:'当前文件无法提供'})
})
// 计算大小
const sized = computed(()=>{
  let size = state.size;
  const units = ['B', 'KB', 'MB', 'GB'];
  let index = 0;
  while (size >= 1024 && index < units.length - 1) {
    size /= 1024;index++;
  }
  return `${size.toFixed(2)} ${units[index]}`;
})
// 二维码
const qrcode = computed(()=>{
  let data = encodeURIComponent(`${location.origin}/drive?f=${state.uuid}`)
  return `https://qun.qq.com/qrcode/index?data=${data}`
})
// 复制外链
const onCopy = ()=>{
  let {uuid,title,mime,created} = state;
  return [`文件：${title}`,`大小：${sized.value}`,`类型：${mime}`,`时间：${created}`,`地址：${location.origin}/drive?f=${uuid}`].join('\r\n');
}
// 推广分享
const shareing = ()=>{
  console.log('shareing');
  useMessage('warning','推广分享内测中')
}
// 获取下载
const download = ()=>{
  let {uuid,downlink,cost} = state;
  console.log('233',uuid,downlink,useFetch);
  downlink == null ? useFetch().vip('drive','download',{uuid:uuid}).then(res=>{
    state.downlink = res.data.link;
    createURL()
    console.log('233',res);
  }).catch(e=>{
    useDialog('confirm',{
      title:`${e.msg}#${e.err}`,
      content:`24小时无限下载权限<span style='color: #f00;'><small>#</small>${(Number(cost) / 100).toFixed(2)}<small>RGB</small></span>`,
      cancel:'取消',
      confirm:'购买'
    }).then(()=>{
      onPayment();
    }).catch(e=>{
      useMessage('warning',`取消购买`)
      // useMessage('warning',`购买失败`)
    })
  }) : createURL()
}
// 创建下载
const createURL = ()=>{ 
  let {downlink,title,ext} = state,attname = `${title}.${ext}`;
  useDialog('alert',{title:'下载文件',content:`大小：${sized.value} - 24小时无限制下载`,'confirm':'下载'}).then(res=>{
    var ele = document.createElement('a');
    ele.download = attname;
    ele.style.display = 'none';
    ele.href = downlink;
    document.body.appendChild(ele);
    ele.click();
    document.body.removeChild(ele);
  }).catch(err=>{
    useMessage('warning','关闭下载')
  })
}
// 调起支付
const onPayment = ()=>{
  let {mail} = useStorage('youloge')
  let {uuid,cost} = state;
  console.log('233',state);
  usePayment({
    local:uuid,
    money:cost,
    mail:mail,
    notify:'https://www.youloge.com/notify',
  }).then(res=>{
    console.log('233',res);
    useMessage('success',`success`)
  }).catch(msg=>{
    useMessage('warning',`支付失败-${msg}`)
  })
  // useFetch({mask:true}).vip('drive','payment',{uuid:uuid,local:local}).then(res=>{
  //   let action = {
  //     200:()=>{
  //       let {random,access,expire} = res.data;
  //       // 缓存
  //       useDialog('password',{
  //         title:'请查收邮箱',
  //         random:random,
  //         submit:'支付'
  //       },false).then(data=>{
  //         onVerify({access:access,code:data.value})
  //       }).catch()
  //     },
  //     300201:()=>{
  //       useMessage('warning','余额不足!请充值或请求好友赠送')
  //     }
  //   };
  //   action[res.err] ?  action[res.err]() : useMessage('warning',res.msg);
  // }).catch(e=>{
  //   useMessage('warning',`调起支付失败 ${e}`)
  // })
}
// 验证支付
const onVerify = (data)=>{
  console.log('onVerify',data)
  useFetch({mask:true}).vip('drive','verify',data).then(res=>{
    res.err == 200 ? (download())  : useMessage('warning',res.msg);
  })
}
// 标题
watch(
  () => state.title,
  (value, _) => {
    document.title = `${value} - youloge.云盘`
  }, {immediate:true}
)

const {uuid,title,intro,author,format,mime,etag,size,cost,owner,created,updated} = toRefs(state)
</script>

<style lang="scss">
.body{
  .item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    border-bottom: 1px dotted #999;
  }
}
</style>