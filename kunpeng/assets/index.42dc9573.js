var O=Object.defineProperty;var w=Object.getOwnPropertySymbols;var Q=Object.prototype.hasOwnProperty,W=Object.prototype.propertyIsEnumerable;var C=(a,l,o)=>l in a?O(a,l,{enumerable:!0,configurable:!0,writable:!0,value:o}):a[l]=o,p=(a,l)=>{for(var o in l||(l={}))Q.call(l,o)&&C(a,o,l[o]);if(w)for(var o of w(l))W.call(l,o)&&C(a,o,l[o]);return a};var D=(a,l,o)=>new Promise((B,_)=>{var m=c=>{try{d(o.next(c))}catch(s){_(s)}},F=c=>{try{d(o.throw(c))}catch(s){_(s)}},d=c=>c.done?B(c.value):Promise.resolve(c.value).then(m,F);d((o=o.apply(a,l)).next())});import{T as X,B as J}from"./TableAction.2eb938ab.js";import{B as Y}from"./BasicForm.2b6c57bc.js";import{u as Z}from"./useForm.3f80a604.js";import{g as ee}from"./list.efd49999.js";import{s as T,_ as ue,d as oe,M as te,e as f,a0 as le,i as A,o as ne,X as ae,R as t,Q as u,u as i,cA as se,be as g,$ as ie,N as re,ad as ce,af as de,aH as pe,ae as me,ar as _e,a$ as fe,av as Fe}from"./vendor.192340e4.js";import"./sortable.esm.81321d43.js";import"./useDesignSetting.0219bcf0.js";import"./index.ea60a1e6.js";import"./propTypes.13e00d90.js";import"./componentSetting.ed658149.js";import"./index.esm.7227c09d.js";const be=[{title:"id",key:"id",width:100},{title:"\u540D\u79F0",key:"name",width:100},{title:"\u5934\u50CF",key:"avatar",width:100,render(a){return T(ue,{size:48,src:a.avatar})}},{title:"\u5730\u5740",key:"address",auth:["basic_list"],ifShow:a=>!0,width:150},{title:"\u5F00\u59CB\u65E5\u671F",key:"beginTime",width:160},{title:"\u7ED3\u675F\u65E5\u671F",key:"endTime",width:160},{title:"\u521B\u5EFA\u65F6\u95F4",key:"date",width:100}],ge=g(" \u65B0\u5EFA "),Be=g("\u5237\u65B0\u6570\u636E"),he=g("\u53D6\u6D88"),ve=g("\u786E\u5B9A"),Ue=oe({setup(a){const l={name:{required:!0,trigger:["blur","input"],message:"\u8BF7\u8F93\u5165\u540D\u79F0"},address:{required:!0,trigger:["blur","input"],message:"\u8BF7\u8F93\u5165\u5730\u5740"},date:{type:"number",required:!0,trigger:["blur","change"],message:"\u8BF7\u9009\u62E9\u65E5\u671F"}},o=[{field:"name",labelMessage:"\u8FD9\u662F\u4E00\u4E2A\u63D0\u793A",component:"NInput",label:"\u59D3\u540D",componentProps:{placeholder:"\u8BF7\u8F93\u5165\u59D3\u540D",onInput:e=>{console.log(e)}},rules:[{required:!0,message:"\u8BF7\u8F93\u5165\u59D3\u540D",trigger:["blur"]}]},{field:"mobile",component:"NInputNumber",label:"\u624B\u673A",componentProps:{placeholder:"\u8BF7\u8F93\u5165\u624B\u673A\u53F7\u7801",showButton:!1,onInput:e=>{console.log(e)}}},{field:"type",component:"NSelect",label:"\u7C7B\u578B",componentProps:{placeholder:"\u8BF7\u9009\u62E9\u7C7B\u578B",options:[{label:"\u8212\u9002\u6027",value:1},{label:"\u7ECF\u6D4E\u6027",value:2}],onUpdateValue:e=>{console.log(e)}}},{field:"makeDate",component:"NDatePicker",label:"\u9884\u7EA6\u65F6\u95F4",defaultValue:118313526e4,componentProps:{type:"date",clearable:!0,onUpdateValue:e=>{console.log(e)}}},{field:"makeTime",component:"NTimePicker",label:"\u505C\u7559\u65F6\u95F4",componentProps:{clearable:!0,onUpdateValue:e=>{console.log(e)}}},{field:"status",label:"\u72B6\u6001",slot:"statusSlot"},{field:"makeProject",component:"NCheckbox",label:"\u9884\u7EA6\u9879\u76EE",componentProps:{placeholder:"\u8BF7\u9009\u62E9\u9884\u7EA6\u9879\u76EE",options:[{label:"\u79CD\u7259",value:1},{label:"\u8865\u7259",value:2},{label:"\u6839\u7BA1",value:3}],onUpdateChecked:e=>{console.log(e)}}},{field:"makeSource",component:"NRadioGroup",label:"\u6765\u6E90",componentProps:{options:[{label:"\u7F51\u4E0A",value:1},{label:"\u95E8\u5E97",value:2}],onUpdateChecked:e=>{console.log(e)}}}],B=te(),_=f(null),m=le(),F=f(),d=f(!1),c=f(!1),s=A({name:"",address:"",date:null}),k=f({pageSize:5,name:"xiaoMa"}),N=A({width:220,title:"\u64CD\u4F5C",key:"action",fixed:"right",render(e){return T(X,{style:"button",actions:[{label:"\u5220\u9664",icon:"ic:outline-delete-outline",onClick:q.bind(null,e),ifShow:()=>!0,auth:["basic_list"]},{label:"\u7F16\u8F91",onClick:V.bind(null,e),ifShow:()=>!0,auth:["basic_list"]}],dropDownActions:[{label:"\u542F\u7528",key:"enabled",ifShow:()=>!0},{label:"\u7981\u7528",key:"disabled",ifShow:()=>!0}],select:n=>{m.info(`\u60A8\u70B9\u51FB\u4E86\uFF0C${n} \u6309\u94AE`)}})}}),[P,{}]=Z({gridProps:{cols:"1 s:1 m:2 l:3 xl:4 2xl:4"},labelWidth:80,schemas:o});function R(){d.value=!0}const S=e=>D(this,null,function*(){return console.log(p(p(p({},s),k.value),e)),yield ee(p(p(p({},s),k.value),e))});function U(e){console.log(e)}function h(){F.value.reload()}function x(e){e.preventDefault(),c.value=!0,_.value.validate(n=>{n?m.error("\u8BF7\u586B\u5199\u5B8C\u6574\u4FE1\u606F"):(m.success("\u65B0\u5EFA\u6210\u529F"),setTimeout(()=>{d.value=!1,h()})),c.value=!1})}function V(e){console.log("\u70B9\u51FB\u4E86\u7F16\u8F91",e),B.push({name:"basic-info",params:{id:e.id}})}function q(e){console.log("\u70B9\u51FB\u4E86\u5220\u9664",e),m.info("\u70B9\u51FB\u4E86\u5220\u9664")}function I(e){console.log(e),h()}function M(e){console.log(e)}return(e,n)=>{const v=ie,$=re,b=ce,E=de,z=pe,L=me,j=_e,G=fe,H=Fe;return ne(),ae(H,{bordered:!1,class:"proCard"},{default:t(()=>[u(i(Y),{onRegister:i(P),onSubmit:I,onReset:M},{statusSlot:t(({model:r,field:y})=>[u(v,{value:r[y],"onUpdate:value":K=>r[y]=K},null,8,["value","onUpdate:value"])]),_:1},8,["onRegister"]),u(i(J),{columns:i(be),request:S,"row-key":r=>r.id,ref_key:"actionRef",ref:F,actionColumn:i(N),"onUpdate:checkedRowKeys":U,"scroll-x":1090},{tableTitle:t(()=>[u(b,{type:"primary",onClick:R},{icon:t(()=>[u($,null,{default:t(()=>[u(i(se))]),_:1})]),default:t(()=>[ge]),_:1})]),toolbar:t(()=>[u(b,{type:"primary",onClick:h},{default:t(()=>[Be]),_:1})]),_:1},8,["columns","row-key","actionColumn"]),u(G,{show:d.value,"onUpdate:show":n[4]||(n[4]=r=>d.value=r),"show-icon":!1,preset:"dialog",title:"\u65B0\u5EFA"},{action:t(()=>[u(j,null,{default:t(()=>[u(b,{onClick:n[3]||(n[3]=()=>d.value=!1)},{default:t(()=>[he]),_:1}),u(b,{type:"info",loading:c.value,onClick:x},{default:t(()=>[ve]),_:1},8,["loading"])]),_:1})]),default:t(()=>[u(L,{model:i(s),rules:l,ref_key:"formRef",ref:_,"label-placement":"left","label-width":80,class:"py-4"},{default:t(()=>[u(E,{label:"\u540D\u79F0",path:"name"},{default:t(()=>[u(v,{placeholder:"\u8BF7\u8F93\u5165\u540D\u79F0",value:i(s).name,"onUpdate:value":n[0]||(n[0]=r=>i(s).name=r)},null,8,["value"])]),_:1}),u(E,{label:"\u5730\u5740",path:"address"},{default:t(()=>[u(v,{type:"textarea",placeholder:"\u8BF7\u8F93\u5165\u5730\u5740",value:i(s).address,"onUpdate:value":n[1]||(n[1]=r=>i(s).address=r)},null,8,["value"])]),_:1}),u(E,{label:"\u65E5\u671F",path:"date"},{default:t(()=>[u(z,{type:"datetime",placeholder:"\u8BF7\u9009\u62E9\u65E5\u671F",value:i(s).date,"onUpdate:value":n[2]||(n[2]=r=>i(s).date=r)},null,8,["value"])]),_:1})]),_:1},8,["model"])]),_:1},8,["show"])]),_:1})}}});export{Ue as default};
