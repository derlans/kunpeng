var B=Object.defineProperty;var k=Object.getOwnPropertySymbols;var x=Object.prototype.hasOwnProperty,N=Object.prototype.propertyIsEnumerable;var h=(i,n,t)=>n in i?B(i,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[n]=t,f=(i,n)=>{for(var t in n||(n={}))x.call(n,t)&&h(i,t,n[t]);if(k)for(var t of k(n))N.call(n,t)&&h(i,t,n[t]);return i};var y=(i,n,t)=>new Promise((c,d)=>{var r=a=>{try{l(t.next(a))}catch(s){d(s)}},m=a=>{try{l(t.throw(a))}catch(s){d(s)}},l=a=>a.done?c(a.value):Promise.resolve(a.value).then(r,m);l((t=t.apply(i,n)).next())});import{T as A,B as M}from"./TableAction.2eb938ab.js";import{g as H}from"./list.efd49999.js";import{s as E,_ as S,d as V,e as w,i as F,o as P,X as z,R as C,Q as b,u as _,be as K,ad as q,av as I}from"./vendor.192340e4.js";import"./sortable.esm.81321d43.js";import"./useDesignSetting.0219bcf0.js";import"./index.ea60a1e6.js";import"./propTypes.13e00d90.js";import"./componentSetting.ed658149.js";import"./index.esm.7227c09d.js";const L=[{title:"id",key:"id",width:100},{title:"\u7F16\u7801",key:"no",width:100},{title:"\u540D\u79F0",key:"name",editComponent:"NInput",editRow:!0,editRule:!0,edit:!0,width:200},{title:"\u5934\u50CF",key:"avatar",width:100,render(i){return E(S,{size:48,src:i.avatar})}},{title:"\u5730\u5740",key:"address",editRow:!0,editComponent:"NSelect",editComponentProps:{options:[{label:"\u5E7F\u4E1C\u7701",value:1},{label:"\u6D59\u6C5F\u7701",value:2}]},edit:!0,width:200,ellipsis:!1},{title:"\u5F00\u59CB\u65E5\u671F",key:"beginTime",editRow:!0,edit:!0,width:240,editComponent:"NDatePicker",editComponentProps:{type:"datetime",format:"yyyy-MM-dd HH:mm:ss",valueFormat:"yyyy-MM-dd HH:mm:ss"},ellipsis:!1},{title:"\u7ED3\u675F\u65E5\u671F",key:"endTime",width:160},{title:"\u72B6\u6001",key:"status",editRow:!0,edit:!0,width:100,editComponent:"NSwitch",editValueMap:i=>i?"\u542F\u7528":"\u7981\u7528"},{title:"\u521B\u5EFA\u65F6\u95F4",key:"date",width:160},{title:"\u505C\u7559\u65F6\u95F4",key:"time",width:80}],Q=K("\u5237\u65B0\u6570\u636E"),ee=V({setup(i){const n=w(),t=w(""),c=F({pageSize:5,name:"xiaoMa"}),d=F({width:150,title:"\u64CD\u4F5C",key:"action",fixed:"right",align:"center",render(e){return E(A,{style:"button",actions:s(e)})}});function r(e){var u;t.value=e.key,(u=e.onEdit)==null||u.call(e,!0)}function m(e){var u;t.value="",(u=e.onEdit)==null||u.call(e,!1,!1)}function l({column:e,value:u,record:o}){e.key==="id"&&(o.editValueRefs.name4.value=`${u}`),console.log(e,u,o)}function a(e){return y(this,null,function*(){var o;(yield(o=e.onEdit)==null?void 0:o.call(e,!1,!0))&&(t.value="")})}function s(e){return e.editable?[{label:"\u4FDD\u5B58",onClick:a.bind(null,e)},{label:"\u53D6\u6D88",onClick:m.bind(null,e)}]:[{label:"\u7F16\u8F91",onClick:r.bind(null,e)}]}const v=e=>y(this,null,function*(){return yield H(f(f({},c),e))});function g(e){console.log(e)}function D(){console.log(n.value),n.value.reload()}function R({record:e,index:u,key:o,value:p}){console.log(p)}return(e,u)=>{const o=q,p=I;return P(),z(p,{bordered:!1,class:"proCard"},{default:C(()=>[b(_(M),{title:"\u8868\u683C\u5217\u8868",titleTooltip:"\u8FD9\u662F\u4E00\u4E2A\u63D0\u793A",columns:_(L),request:v,"row-key":T=>T.id,ref_key:"actionRef",ref:n,actionColumn:_(d),onEditEnd:R,onEditChange:l,"onUpdate:checkedRowKeys":g,"scroll-x":1590},{toolbar:C(()=>[b(o,{type:"primary",onClick:D},{default:C(()=>[Q]),_:1})]),_:1},8,["columns","row-key","actionColumn"])]),_:1})}}});export{ee as default};
