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
      :row-key="(row) => row.id"
      ref="actionRef"
      :actionColumn="actionColumn"
      @update:checked-row-keys="onCheckedRow"
      :scroll-x="1090"
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
  import { getRuleCollection } from '@/api/rule/index';
  import { columns } from './columns';
  // import { useRouter } from 'vue-router';
  // import {  dailyRecord } from './index';
  // import dailyRecordData from './dailyRecord.json';

  const schemas = [
    {
      field: 'pathName',
      component: 'NInput',
      label: '路径',
    },
    {
      field: 'name',
      component: 'NInput',
      label: '规则名',
    },
  ];

  // const router = useRouter();
  const message = useMessage();
  const actionRef = ref();

  const actionColumn = reactive({
    width: 100,
    title: '操作',
    key: 'action',
    fixed: 'right',
    render(record) {
      return h(TableAction as any, {
        style: 'button',
        actions: [
          {
            label: '删除',
            icon: 'ic:outline-delete-outline',
            onClick: handleDelete.bind(null, record),
          },
        ],
      });
    },
  });

  const [register, formMethods] = useForm({
    gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
    labelWidth: 80,
    schemas: schemas as any[],
  });
  window['formMethods'] = formMethods;
  const loadDataTable = async ({ page, size }) => {
    const { name = '', pathName = '' } = formMethods.getFieldsValue();
    const { records, total: totalCount } = await getRuleCollection({ page, size, name, pathName });
    if (totalCount) {
      return {
        list: records,
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

  function handleReset(values: Recordable) {
    console.log(values);
  }
</script>
