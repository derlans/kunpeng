var h=Object.defineProperty;var y=Object.getOwnPropertySymbols;var w=Object.prototype.hasOwnProperty,E=Object.prototype.propertyIsEnumerable;var _=(a,t,e)=>t in a?h(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e,m=(a,t)=>{for(var e in t||(t={}))w.call(t,e)&&_(a,e,t[e]);if(y)for(var e of y(t))E.call(t,e)&&_(a,e,t[e]);return a};var f=(a,t,e)=>new Promise((r,s)=>{var l=o=>{try{n(e.next(o))}catch(i){s(i)}},d=o=>{try{n(e.throw(o))}catch(i){s(i)}},n=o=>o.done?r(o.value):Promise.resolve(o.value).then(l,d);n((e=e.apply(a,t)).next())});import{B as b}from"./TableAction.2eb938ab.js";import{g}from"./list.efd49999.js";import{s as v,_ as T,d as x,e as B,i as D,o as R,X as N,R as p,Q as k,u as C,be as M,ad as A,av as H}from"./vendor.192340e4.js";import"./sortable.esm.81321d43.js";import"./useDesignSetting.0219bcf0.js";import"./index.ea60a1e6.js";import"./propTypes.13e00d90.js";import"./componentSetting.ed658149.js";import"./index.esm.7227c09d.js";const P=[{title:"id",key:"id",width:100},{title:"\u7F16\u7801",key:"no",width:100},{title:"\u540D\u79F0",key:"name",editComponent:"NInput",editRule:!0,edit:!0,width:200},{title:"\u5934\u50CF",key:"avatar",width:100,render(a){return v(T,{size:48,src:a.avatar})}},{title:"\u5730\u5740",key:"address",editComponent:"NSelect",editComponentProps:{options:[{label:"\u5E7F\u4E1C\u7701",value:1},{label:"\u6D59\u6C5F\u7701",value:2}]},edit:!0,width:200,ellipsis:!1},{title:"\u5F00\u59CB\u65E5\u671F",key:"beginTime",edit:!0,width:160,editComponent:"NDatePicker",editComponentProps:{type:"datetime",format:"yyyy-MM-dd HH:mm:ss",valueFormat:"yyyy-MM-dd HH:mm:ss"},ellipsis:!1},{title:"\u7ED3\u675F\u65E5\u671F",key:"endTime",width:160},{title:"\u521B\u5EFA\u65F6\u95F4",key:"date",width:160},{title:"\u505C\u7559\u65F6\u95F4",key:"time",width:80}],V=M("\u5237\u65B0\u6570\u636E"),j=x({setup(a){const t=B(),e=D({pageSize:5,name:"xiaoMa"});function r({column:o,value:i,record:u}){o.key==="id"&&(u.editValueRefs.name4.value=`${i}`),console.log(o,i,u)}const s=o=>f(this,null,function*(){return yield g(m(m({},e),o))});function l(o){console.log(o)}function d(){console.log(t.value),t.value.reload()}function n({record:o,index:i,key:u,value:c}){console.log(c)}return(o,i)=>{const u=A,c=H;return R(),N(c,{bordered:!1,class:"proCard"},{default:p(()=>[k(C(b),{title:"\u8868\u683C\u5217\u8868",titleTooltip:"\u8FD9\u662F\u4E00\u4E2A\u63D0\u793A",columns:C(P),request:s,"row-key":F=>F.id,ref_key:"actionRef",ref:t,onEditEnd:n,onEditChange:r,"onUpdate:checkedRowKeys":l,"scroll-x":1360},{toolbar:p(()=>[k(u,{type:"primary",onClick:d},{default:p(()=>[V]),_:1})]),_:1},8,["columns","row-key"])]),_:1})}}});export{j as default};