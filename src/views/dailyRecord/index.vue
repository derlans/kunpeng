<template>
  <n-card :bordered="false" class="proCard">
    <BasicForm @register="register" @submit="handleSubmit" @reset="handleReset">
      <template #statusSlot="{ model, field }">
        <n-input v-model:value="model[field]" />
      </template>
    </BasicForm>
    <BasicTable
      :columns="columns"  
      :request="loadDataTable"
      :row-key="(row) => row._id" 
      ref="actionRef"
      :actionColumn="actionColumn"
      @update:checked-row-keys="onCheckedRow"
      :scroll-x="1800"
    >
      <template #toolbar>
        <n-button type="primary" @click="reloadTable">刷新数据</n-button>
      </template>
    </BasicTable>
  </n-card>

</template>

<script lang="ts" setup>
  import { h, reactive, ref } from 'vue';
  import { useMessage } from 'naive-ui';
  import { BasicTable, TableAction } from '@/components/Table';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { getDailyRecordList ,getServiceNames} from '@/api/dailyRecord/index';
  import { columns } from './columns';
  import { levelOpations } from './index';
  // import { useRouter } from 'vue-router';
  // import {  dailyRecord } from './index';
  // import dailyRecordData from './dailyRecord.json';
  const message = useMessage();
  const actionRef = ref();
      const schemas =  [  
    {
      filed: 'message',
      component: 'NInput',
      label: '搜索',
    },
    {
      field: 'id',
      component: 'NInput',
      label: 'id',
      componentProps: {
        placeholder: '日志的id'
      },
    },
    {
      field: 'index',
      component: 'NSelect',
      label: '微服务名称',
      componentProps:{
        options:[]
      }
    },
    {
      field: 'level',
      component: 'NSelect',
      label: '等级',
      componentProps: {
        placeholder: '请选择等级',
        options: levelOpations,
      },
    },
    {
      field: 'timeRange',
      component: 'NDatePicker',
      label: '时间范围',
      componentProps: {
        type: 'datetimerange',
      },
    },
  ];     
  let [register, formMethods] = useForm({
    gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
    labelWidth: 80,
    schemas: schemas as any[],
  }) 
  getServiceNames().then((res:any[])=>{ 
    const data:any[]=res || [] 
    const serviceNamesOpations:any[] = data.map((value)=>{ 
      const service=value.split(':');
        return { 
        label:service[0],
        value:service[1] 
        }     
  }) 
  register(formMethods)  
  })


  const actionColumn = reactive({
    width: 200,
    title: '操作',
    key: 'action',
    fixed: 'right',
    render(record) {
      return h(TableAction as any, {
        style: 'button',
        actions: [
          {
            label: '删除',
            onClick: handleDelete.bind(null, record),
            type: 'error',
          },
          {
            label: '查看详情',
            onClick: handleLookDetail.bind(null, record),
            type: 'primary',
          },
        ],
      });
    },
  });
  const loadDataTable = async ({ page, size }) => {
  
    console.log('请求数据');
    
    const searchQuery = formMethods.getFieldsValue();
    const timeRange = searchQuery.timeRange;
    if (timeRange) {
      searchQuery.fromDateTime = timeRange[0];
      searchQuery.toDateTime = timeRange[1];
      delete searchQuery.timeRange;
    }
    const {
      hits: {
        hits,
        totalHits: { value: totalCount },
      },
    } = await getDailyRecordList({ page, size, ...searchQuery });
    if (totalCount) {
      return {
        list: hits,
        page,
        pageCount: Math.ceil(totalCount / size),
        size,
      };
    }
    return {
      list: [],
      page: 1,
      pageCount: 1,
    };
  };

  function onCheckedRow(rowKeys) {
    console.log(rowKeys);
  }

  function reloadTable() {
    actionRef.value.reload();
  }

  function handleDelete(record: Recordable) {
    console.log('点击了删除', record);

    message.info('点击了删除');
  }

  async function handleSubmit() {
    reloadTable();
  }
  function handleLookDetail(values: Recordable) {
    const dialog = window['$dialog'];
    dialog.error({
      title: '错误详情',
      content: values?.sourceAsMap?.message,
    });
  }
  function handleReset(values: Recordable) {
    console.log(values);
  }


</script>

<style lang="less" scoped></style>
