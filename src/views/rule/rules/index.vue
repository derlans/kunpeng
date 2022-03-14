<template>
  <n-card :bordered="false" class="proCard">
    <BasicTable
      :columns="columns"
      :request="loadDataTable"
      :row-key="(row) => row._id"
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
  import { getRuleList } from '@/api/rule/index';
  import { columns } from './columns';
  // import { useRouter } from 'vue-router';
  // import {  dailyRecord } from './index';
  // import dailyRecordData from './dailyRecord.json';

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
 
  const loadDataTable = async ({ page, size }) => {
    const list: any[] = await getRuleList();
    const totalCount = list.length;
    if (totalCount) {
      return {
        list: list.slice(page * (size - 1), page * size),
        page,
        pageCount: parseInt(totalCount / size),
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
</script>

<style lang="less" scoped></style>
