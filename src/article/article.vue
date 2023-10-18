<template>
  <div>
    <y-header aria="文章" aside="true" logo="Youloge" ></y-header>
    <main class="article">
      <div>
        <h1 class="title">{{title}}</h1>
        <div class="author">{{ updated }}</div>
        <div class="article-content" v-html="content" v-preview></div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, inject,onMounted,reactive,watch,toRefs } from 'vue';
const useFetch = inject('useFetch'), useDialog = inject('useDialog'),useMessage = inject('useMessage'),usePlus = inject('usePlus');
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
  content:[],
  record:{},
  downlink:null
})

// 初始info
onMounted(()=>{
  state.uuid = new URL(location).searchParams.get('s');
  console.log(state.uuid)
  state.uuid ? useFetch().api('article','info',{uuid:state.uuid}).then(({err,msg,data})=>{
    err == 200 ? Object.assign(state, data): useMessage('warning',msg);
    SyncContent()
  }).catch(err=>{
    useDialog('alert',{title:'网络错误',content:'请检查网络'})
  }) : useDialog('alert',{title:'文章过期或失效',content:'改UUID无法提供服务'})
})
const SyncContent = ()=>{
  fetch(`https://cdn.youloge.com/${state.uuid}?${new Date() / 1000 / 300 >> 0}`).then(r=>r.text()).then(content=>{
    state.content = content
    // console.log(state.content)
  })
}
// 二维码
const qrcode = computed(()=>{
  let data = encodeURIComponent(`https://youloge.com/drive?f=${state.uuid}`)
  return `https://qun.qq.com/qrcode/index?data=${data}`
})
// 复制外链
const onCopy = ()=>{
  let {uuid,title,mime,created} = state;
  return [`文件：${title}`,`大小：${sized.value}`,`类型：${mime}`,`时间：${created}`,`地址：youloge.com/drive?f=${uuid}`].join('\r\n');
}
// 推广分享
const shareing = ()=>{  
  useMessage('warning','推广分享内测中')
}
// 获取下载
const download = ()=>{
  let {uuid,downlink,cost} = state;
  console.log('233',uuid,downlink);
  downlink == null ? useFetch({mask:true}).vip('drive','download',{uuid:uuid}).then(res=>{
    res.err == 200 ? (state.downlink = res.data.link,createURL()) : useDialog('confirm',{
      title:`${res.msg}`,
      content:`是否购买下载权限<span style='color: #f00;'><small>&</small>${Number(cost).toFixed(2)}<small>RGB</small></span>`,
      cancel:'取消',
      confirm:'购买'
    }).then(()=>{onPayment();}).catch(e=>{
      useMessage('warning',`购买失败，${e}`)
    })
  }).catch() : createURL()
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
    useMessage().warning('关闭下载')
  })
}
// 调起支付
const onPayment = ()=>{
  let {uuid} = state;
  let local = Math.random().toString(32);
  useFetch({mask:true}).vip('drive','payment',{uuid:uuid,local:local}).then(res=>{
    let action = {
      200:()=>{
        let {random,access,expire} = res.data;
        // 缓存
        useDialog('password',{
          title:'请查收邮箱',
          random:random,
          submit:'支付'
        },false).then(data=>{
          onVerify({access:access,code:data.value})
        }).catch()
      },
      300201:()=>{
        useMessage('warning','余额不足!请充值或请求好友赠送')
      }
    };
    action[res.err] ?  action[res.err]() : useMessage('warning',res.msg);
  }).catch(e=>{
    useMessage('warning',`调起支付失败 ${e}`)
  })
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
    document.title = `${value} - youloge.云盘`;
    var meta = document.createElement('meta');
    meta.setAttribute('name', 'description');
    meta.setAttribute('content', state.intro);
    console.log(meta)
    document.head.appendChild(meta);
    // document.querySelector('head meta[name="description"]')?.content=state.intro
  }, {immediate:true}
)

const {uuid,title,intro,author,format,mime,etag,size,cost,owner,content,created,updated} = toRefs(state)
</script>

<style lang="scss">
.article{
  padding: 10px;
  max-width: 680px; 
  margin: 0 auto;
  .title{
    margin: 0 0 1.3rem;
    font-size: 1.667rem;
    font-weight: 600;
    line-height: 1.31;
    color: #222
  }
  p{
    line-height: inherit;
    margin: 22px 0;
    letter-spacing: 2px;
    font-size: 14px;
    word-spacing: 2px;
  }
  a{
    color: #4dd0e1;
    border-bottom: 1px solid #4dd0e1;
    font-weight: 400;
    text-decoration: none;
    margin: 0 4px;
  }
  pre{
    box-shadow: 1px 2px 4px 2px #dfdfdf;
    padding: 10px;
  }
  iframe{
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
}
</style>