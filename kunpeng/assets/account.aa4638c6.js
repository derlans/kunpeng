import k from"./BasicSetting.25dae804.js";import v from"./SafetySetting.1827c4de.js";import g from"./PasswordSetting.1c4ad777.js";import{_ as F}from"./index.ea60a1e6.js";import{d as C,e as p,o as s,c as i,Q as a,R as e,F as h,r as x,S as b,be as d,t as m,X as o,V as _,aM as A,av as $,aJ as T,aI as V}from"./vendor.192340e4.js";const z=C({setup(N){const B=[{name:"\u57FA\u672C\u8BBE\u7F6E",desc:"\u4E2A\u4EBA\u8D26\u6237\u4FE1\u606F\u8BBE\u7F6E",key:1},{name:"\u5B89\u5168\u8BBE\u7F6E",desc:"\u90AE\u7BB1\u8BBE\u7F6E",key:2},{name:"\u5B89\u5168\u8BBE\u7F6E",desc:"\u5BC6\u7801\u8BBE\u7F6E",key:3}],n=p(1),c=p("\u57FA\u672C\u8BBE\u7F6E");function f(u){n.value=u.key,c.value=u.name}return(u,w)=>{const E=A,r=$,l=T,y=V;return s(),i("div",null,[a(y,{"x-gap":24},{default:e(()=>[a(l,{span:"6"},{default:e(()=>[a(r,{bordered:!1,size:"small",class:"proCard"},{default:e(()=>[(s(),i(h,null,x(B,t=>a(E,{class:b(["thing-cell",{"thing-cell-on":n.value===t.key}]),key:t.key,onClick:D=>f(t)},{header:e(()=>[d(m(t.name),1)]),description:e(()=>[d(m(t.desc),1)]),_:2},1032,["class","onClick"])),64))]),_:1})]),_:1}),a(l,{span:"18"},{default:e(()=>[a(r,{bordered:!1,size:"small",title:c.value,class:"proCard"},{default:e(()=>[n.value===1?(s(),o(k,{key:0})):_("",!0),n.value===2?(s(),o(v,{key:1})):_("",!0),n.value===3?(s(),o(g,{key:2})):_("",!0)]),_:1},8,["title"])]),_:1})]),_:1})])}}});var Q=F(z,[["__scopeId","data-v-b8b3d29a"]]);export{Q as default};