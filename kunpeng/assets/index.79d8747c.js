import{p as E,q as V}from"./index.ea60a1e6.js";import{s as n,aF as D,d as N,e as p,bw as A,o as _,c as x,Q as o,R as c,w as M,X as $,u as d,ad as m,c1 as I,F as R,be as S,aN as U,av as q,a$ as K,ar as O}from"./vendor.192340e4.js";import Q from"./form.99ad24ba.js";import{u as X}from"./useForm.d81d1de8.js";const f={0:{tagType:"success",lable:"\u76EE\u5F55"},1:{tagType:"warning",lable:"\u83DC\u5355"},2:{tagType:"info",lable:"\u64CD\u4F5C"}};function j(s){return n(D,{type:f[s].tagType},f[s].lable)}const z=S("\u65B0\u589E"),P=N({setup(s){const a=E();a.setAuth();const y=a.getAllAuthNodeTree,g=e=>e.perms;function C(){return[{key:"name",title:"\u540D\u79F0"},{key:"icon",title:"\u56FE\u6807",render(e){if(e.icon)return V(e.icon)}},{key:"type",title:"\u7C7B\u578B",render(e){return j(e.type)}},{key:"orderId",title:"\u6392\u5E8F\u53F7"},{key:"perms",title:"\u6388\u6743\u6807\u8BC6\u7B26"}]}const h=[{title:"\u64CD\u4F5C",key:"Operation",render(e){return n(O,null,[n(m,{type:"info",onClick:()=>{u.value=!0,l.value=1,k.setFieldsValue(e,1)}},"\u4FEE\u6539"),n(m,{type:"success",onClick:()=>{a.deleteAuth(e.id).then(()=>{window.$message.success("\u6210\u529F")}).catch(()=>window.$message.error("\u5931\u8D25"))}},"\u5220\u9664")])}}],w=[...C(),...h],l=p(0),u=p(!1),F=[{field:"id"},{field:"name"},{field:"type",defaultValue:0}],[r,k]=X({schemas:F});return(e,t)=>{const v=U,b=q,B=K,T=A("permission");return _(),x(R,null,[o(b,{title:"\u83DC\u5355\u5217\u8868"},{default:c(()=>[M((_(),$(d(m),{type:"info",class:"mb-3",onClick:t[0]||(t[0]=()=>{u.value=!0,l.value=0})},{default:c(()=>[z]),_:1})),[[T,"auth:create"]]),o(v,{columns:w,data:d(y),"row-key":g},null,8,["data"])]),_:1}),o(B,{show:u.value,"onUpdate:show":t[2]||(t[2]=i=>u.value=i),"show-icon":!1,preset:"dialog",title:"\u6743\u9650\u8282\u70B9"},{default:c(()=>[o(Q,{modelValue:d(r),"onUpdate:modelValue":t[1]||(t[1]=i=>I(r)?r.value=i:null),mode:l.value},null,8,["modelValue","mode"])]),_:1},8,["show"])],64)}}});export{P as default};
