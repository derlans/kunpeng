import{B as k}from"./BasicUpload.650bf9a0.js";import{I as x}from"./index.ea60a1e6.js";import{d as U,e as V,a0 as R,i as d,o as j,c as q,a as f,Q as e,R as u,u as n,be as _,av as w,$ as N,af as S,ad as I,ar as J,ae as P,aJ as Q,aI as T}from"./vendor.192340e4.js";import"./componentSetting.ed658149.js";const G={class:"n-layout-page-header"},H=_(" \u4E0A\u4F20\u56FE\u7247\uFF0C\u7528\u4E8E\u5411\u7528\u6237\u6536\u96C6\u56FE\u7247\u4FE1\u606F "),L={style:{"margin-left":"80px"}},M=_("\u63D0\u4EA4\u9884\u7EA6"),W=_("\u91CD\u7F6E"),X=U({setup(Z){const g=x(),F={name:{required:!0,message:"\u8BF7\u8F93\u5165\u9884\u7EA6\u59D3\u540D",trigger:"blur"},remark:{required:!0,message:"\u8BF7\u8F93\u5165\u9884\u7EA6\u5907\u6CE8",trigger:"blur"},images:{required:!0,type:"array",message:"\u8BF7\u4E0A\u4F20\u75C5\u4F8B\u56FE\u7247",trigger:"change"}},l=V(null),i=R(),{uploadUrl:E}=g,a=d({name:"",mobile:"",images:["https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"]}),C=d({platform:"miniPrograms",timestamp:new Date().getTime(),token:"Q6fFCuhc1vkKn5JNFWaCLf6gRAc5n0LQHd08dSnG4qo="});function v(){l.value.validate(s=>{s?i.error("\u9A8C\u8BC1\u5931\u8D25\uFF0C\u8BF7\u586B\u5199\u5B8C\u6574\u4FE1\u606F"):i.success("\u9A8C\u8BC1\u6210\u529F")})}function b(){l.value.restoreValidation()}function h(s){a.images=n(s)}return(s,t)=>{const m=w,p=N,r=S,c=I,A=J,B=P,D=Q,y=T;return j(),q("div",null,[f("div",G,[e(m,{bordered:!1,title:"\u4E0A\u4F20\u56FE\u7247"},{default:u(()=>[H]),_:1})]),e(m,{bordered:!1,class:"mt-4 proCard"},{default:u(()=>[e(y,{cols:"2 s:1 m:3 l:3 xl:3 2xl:3",responsive:"screen"},{default:u(()=>[e(D,{offset:"0 s:0 m:1 l:1 xl:1 2xl:1"},{default:u(()=>[e(B,{"label-width":80,model:n(a),rules:F,"label-placement":"left",ref_key:"formRef",ref:l,class:"py-8"},{default:u(()=>[e(r,{label:"\u9884\u7EA6\u59D3\u540D",path:"name"},{default:u(()=>[e(p,{value:n(a).name,"onUpdate:value":t[0]||(t[0]=o=>n(a).name=o),placeholder:"\u8F93\u5165\u59D3\u540D"},null,8,["value"])]),_:1}),e(r,{label:"\u9884\u7EA6\u53F7\u7801",path:"mobile"},{default:u(()=>[e(p,{placeholder:"\u7535\u8BDD\u53F7\u7801",value:n(a).mobile,"onUpdate:value":t[1]||(t[1]=o=>n(a).mobile=o)},null,8,["value"])]),_:1}),e(r,{label:"\u75C5\u4F8B\u56FE\u7247",path:"images"},{default:u(()=>[e(n(k),{action:`${n(E)}/v1.0/files`,headers:n(C),data:{type:0},name:"files",width:100,height:100,onUploadChange:h,value:n(a).images,"onUpdate:value":t[2]||(t[2]=o=>n(a).images=o),helpText:"\u5355\u4E2A\u6587\u4EF6\u4E0D\u8D85\u8FC72MB\uFF0C\u6700\u591A\u53EA\u80FD\u4E0A\u4F2010\u4E2A\u6587\u4EF6"},null,8,["action","headers","value"])]),_:1}),f("div",L,[e(A,null,{default:u(()=>[e(c,{type:"primary",onClick:v},{default:u(()=>[M]),_:1}),e(c,{onClick:b},{default:u(()=>[W]),_:1})]),_:1})])]),_:1},8,["model"])]),_:1})]),_:1})]),_:1})])}}});export{X as default};
