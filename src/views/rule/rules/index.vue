<template>
  <n-card :bordered="false" class="proCard">
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
  import { getRuleList } from '@/api/rule/index';
  import { columns } from './columns';
  import { useRouter } from 'vue-router';
  import { RuleFormMode } from './index';
  const router = useRouter();
  const message = useMessage();
  const actionRef = ref();
  const actionColumn = reactive({
    width: 200,
    title: '操作',
    key: 'action',
    align: 'center',
    fixed: 'right',
    render(record) {
      return h(TableAction as any, {
        style: 'button',
        actions: [
          {
            label: '删除',
            onClick: handleDelete.bind(null, record),
          },
          {
            label: '查看详情',
            type: 'success',
            onClick: handleLookDetail.bind(null, record),
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
        list: list.slice(size * (page - 1), size * page),
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
  function handleLookDetail(record: Recordable) {
    router.push({
      path: '/rule/ruleEditor',
      query: { modeValue: RuleFormMode.UPDATE_RULE, id: record.id },
    });
  }
</script>

<style lang="less" scoped></style>
